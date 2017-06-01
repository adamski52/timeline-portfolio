import {TestBed, inject} from '@angular/core/testing';
import {IBlog} from "../../interfaces/blog";
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";
import {TimelineBlogService} from "./timeline-blog-item/timeline-blog-item.service";
import {TimelineRepoService} from "./timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item/timeline-event-item.service";
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {ErrorService} from "../../services/error.service";
import {TimelineService} from "./timeline.service";
import {TimelineSettingsService} from "./timeline-settings/timeline-settings.service";
import {Mock} from "protractor/built/driverProviders";
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IYearCollection} from "../../interfaces/sorted-item-collection";


describe('TimelineService', () => {
    let blogResponse = require("../../../../mocks/posts.json"),
        blogMock:IBlog[] = blogResponse.items,
        repoMock:IRepo[] = require("../../../../mocks/repos.json"),
        eventMock:IEvent[] = require("../../../../mocks/events.json"),
        allItems:(IBlog|IRepo|IEvent)[] = [].concat(blogMock, repoMock, eventMock);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                TimelineService,
                TimelineSettingsService,
                TimelineRepoService,
                TimelineBlogService,
                TimelineEventService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    function ahhhSmooshIt(years:IYearCollection[]):(IBlog|IRepo|IEvent)[] {
        let items:(IBlog|IRepo|IEvent)[] = [];

        for (let year of years) {
            for (let month of year.months) {
                for (let date of month.dates) {
                    for (let item of date.items) {
                        items.push(item);
                    }
                }
            }
        }

        return items;
    }

    it('should invoke the repos service', inject([TimelineService, TimelineRepoService], (timelineService:TimelineService, reposService:TimelineRepoService) => {
        spyOn(reposService, "fetch");

        timelineService.fetch();

        expect(reposService.fetch).toHaveBeenCalled();
    }));

    it('should respond to the repos service', inject([XHRBackend, TimelineEventService, TimelineBlogService, TimelineRepoService, TimelineService], (mockBackend:MockBackend, eventsService:TimelineEventService, blogsService:TimelineBlogService, reposService:TimelineRepoService, timelineService:TimelineService) => {
        spyOn(eventsService, "fetch");
        spyOn(blogsService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoMock
            })));
        });

        let items:(IBlog | IEvent | IRepo)[];
        timelineService.subscribe((years:IYearCollection[]) => {
            items = ahhhSmooshIt(years);
            items = items.filter((item:IRepo | IEvent | IRepo) => {
                return timelineService.isItemRepo(item);
            });
        });

        timelineService.fetch();

        expect(items.length).toEqual(repoMock.length);
    }));

    it('should invoke the events service', inject([TimelineService, TimelineEventService], (timelineService:TimelineService, eventsService:TimelineEventService) => {
        spyOn(eventsService, "fetch");

        timelineService.fetch();

        expect(eventsService.fetch).toHaveBeenCalled();
    }));

    it('should respond to the events service', inject([XHRBackend, TimelineEventService, TimelineBlogService, TimelineRepoService, TimelineService], (mockBackend:MockBackend, eventsService:TimelineEventService, blogsService:TimelineBlogService, reposService:TimelineRepoService, timelineService:TimelineService) => {
        spyOn(reposService, "fetch");
        spyOn(blogsService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: eventMock
            })));
        });

        let items:(IBlog | IEvent | IRepo)[];
        timelineService.subscribe((years:IYearCollection[]) => {
            items = ahhhSmooshIt(years);
            items = items.filter((item:IRepo | IEvent | IRepo) => {
                return timelineService.isItemCommit(item) || timelineService.isItemBranch(item);
            });
        });

        timelineService.fetch();

        expect(items.length).toEqual(eventMock.length);
    }));

    it('should invoke the blogs service', inject([TimelineService, TimelineBlogService], (timelineService:TimelineService, blogsService:TimelineBlogService) => {
        spyOn(blogsService, "fetch");

        timelineService.fetch();

        expect(blogsService.fetch).toHaveBeenCalled();
    }));

    it('should respond to the blogs service', inject([XHRBackend, TimelineEventService, TimelineBlogService, TimelineRepoService, TimelineService], (mockBackend:MockBackend, eventsService:TimelineEventService, blogsService:TimelineBlogService, reposService:TimelineRepoService, timelineService:TimelineService) => {
        spyOn(reposService, "fetch");
        spyOn(eventsService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: blogResponse
            })));
        });

        let items:(IBlog | IEvent | IRepo)[];
        timelineService.subscribe((years:IYearCollection[]) => {
            items = ahhhSmooshIt(years);
            items = items.filter((item:IRepo | IEvent | IRepo) => {
                return timelineService.isItemBlog(item);
            });
        });

        timelineService.fetch();

        expect(items.length).toEqual(blogMock.length);
    }));

    it('should filter commits', inject([TimelineService], (timelineService:TimelineService) => {
        let matches:(IEvent|IBlog|IRepo)[] = allItems.filter((item:IEvent) => {
            return timelineService.isItemCommit(item);
        });

        expect(matches.length).toEqual(23);
    }));

    it('should filter branches', inject([TimelineService], (timelineService:TimelineService) => {
        let matches:(IEvent|IBlog|IRepo)[] = allItems.filter((item:IEvent) => {
            return timelineService.isItemBranch(item);
        });

        expect(matches.length).toEqual(7);
    }));

    it('should filter repos', inject([TimelineService], (timelineService:TimelineService) => {
        let matches:(IEvent|IBlog|IRepo)[] = allItems.filter((item:IEvent) => {
            return timelineService.isItemRepo(item);
        });

        expect(matches.length).toEqual(19);
    }));

    it('should filter blogs', inject([TimelineService], (timelineService:TimelineService) => {
        let matches:(IEvent|IBlog|IRepo)[] = allItems.filter((item:IEvent) => {
            return timelineService.isItemBlog(item);
        });

        expect(matches.length).toEqual(1);
    }));

    it('should get blog time', inject([TimelineService], (timelineService:TimelineService) => {
        let item:IBlog = blogMock[0],
            time = timelineService.getItemTime(item);

        expect(time).toEqual(1493232720000);
    }));

    it('should get commit time', inject([TimelineService], (timelineService:TimelineService) => {
        let item:IEvent = eventMock[0],
            time = timelineService.getItemTime(item);

        expect(time).toEqual(1491875748000);
    }));

    it('should get branch time', inject([TimelineService], (timelineService:TimelineService) => {
        let item:IEvent = eventMock[4],
            time = timelineService.getItemTime(item);

        expect(time).toEqual(1491779755000);
    }));

    it('should get repo time', inject([TimelineService], (timelineService:TimelineService) => {
        let item:IRepo = repoMock[0],
            time = timelineService.getItemTime(item);

        expect(time).toEqual(1484852546000);
    }));

    it('should use 0 if an unknown item (should never happen, but ???', inject([TimelineService], (timelineService:TimelineService) => {
        let item:any = {lol: "wut"},
            time = timelineService.getItemTime(item);

        expect(time).toEqual(0);
    }));

    it('should set the $$isHidden status from settings', inject([TimelineEventService, TimelineBlogService, TimelineRepoService, XHRBackend, TimelineSettingsService, TimelineService], (eventsService:TimelineEventService, blogsService:TimelineBlogService, repoService:TimelineRepoService, mockBackend:MockBackend, settingsService:TimelineSettingsService, timelineService:TimelineService) => {
        spyOn(eventsService, "fetch");
        spyOn(blogsService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoMock
            })));
        });

        let items:(IBlog | IEvent | IRepo)[];
        timelineService.subscribe((years:IYearCollection[]) => {
            items = ahhhSmooshIt(years);
            items = items.filter((item:IRepo | IEvent | IRepo) => {
                return timelineService.isItemRepo(item);
            });
        });

        timelineService.fetch();

        settingsService.toggleSetting("repos");

        for (let item of items) {
            expect(item.$$isHidden).toEqual(true);
        }
    }));
});

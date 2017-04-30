import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineComponent} from './timeline.component';
import {TimelineRepoService} from "./timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item/timeline-event-item.service";
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {ErrorService} from "../../services/error.service";
import {MockBackend} from '@angular/http/testing';
import {TimelineRepoLanguagesComponent} from "./timeline-repo-languages/timeline-repo-languages.component";
import {TimelineRepoComponent} from "./timeline-repo-item/timeline-repo-item.component";
import {TickerService} from "../../services/ticker.service";
import {TimelineDateComponent} from "./timeline-date/timeline-date.component";
import {TimelineSettingsService} from "./timeline-settings/timeline-settings.service";
import {TimelineBlogComponent} from "./timeline-blog-item/timeline-blog-item.component";
import {TimelineBlogService} from "./timeline-blog-item/timeline-blog-item.service";
import {TimelineEventComponent} from "./timeline-event-item/timeline-event-item.component";
import {IBlog} from "../../interfaces/blog";
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";

describe('TimelineComponent', () => {
    let fixture:ComponentFixture<TimelineComponent>,
        component:TimelineComponent,
        response,
        blogResponse = require("../../../../mocks/posts.json"),
        blogMock:IBlog[] = blogResponse.items,
        repoMock:IRepo[] = require("../../../../mocks/repos.json"),
        eventMock:IEvent[] = require("../../../../mocks/events.json");

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TimelineComponent,
                TimelineRepoComponent,
                TimelineRepoLanguagesComponent,
                TimelineDateComponent,
                TimelineBlogComponent,
                TimelineEventComponent
            ],
            providers: [
                TimelineRepoService,
                TimelineEventService,
                TimelineSettingsService,
                TimelineBlogService,
                TickerService,
                ErrorService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents();
    }));

    it('should invoke the repos service', inject([TimelineRepoService], (reposService:TimelineRepoService) => {
        spyOn(reposService, "fetch");
        fixture = TestBed.createComponent(TimelineComponent);
        fixture.detectChanges();
        expect(reposService.fetch).toHaveBeenCalled();
    }));

    it('should invoke the events service', inject([TimelineEventService], (eventsService:TimelineEventService) => {
        spyOn(eventsService, "fetch");
        fixture = TestBed.createComponent(TimelineComponent);
        fixture.detectChanges();
        expect(eventsService.fetch).toHaveBeenCalled();
    }));

    it('should invoke the blogs service', inject([TimelineBlogService], (blogService:TimelineBlogService) => {
        spyOn(blogService, "fetch");
        fixture = TestBed.createComponent(TimelineComponent);
        fixture.detectChanges();
        expect(blogService.fetch).toHaveBeenCalled();
    }));

    it('should respond to the repos service', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, XHRBackend], (eventsService:TimelineEventService, reposService:TimelineRepoService, blogService:TimelineBlogService, mockBackend:MockBackend) => {
        spyOn(eventsService, "fetch");
        spyOn(blogService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoMock
            })));
        });

        reposService.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.repos).toBe(repoMock);
    }));


    it('should respond to the events service', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, XHRBackend], (eventsService:TimelineEventService, reposService:TimelineRepoService, blogService:TimelineBlogService, mockBackend:MockBackend) => {
        spyOn(reposService, "fetch");
        spyOn(blogService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: eventMock
            })));
        });

        eventsService.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.events).toBe(eventMock);
    }));

    it('should respond to the blogs service', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, XHRBackend], (eventsService:TimelineEventService, reposService:TimelineRepoService, blogService:TimelineBlogService, mockBackend:MockBackend) => {
        spyOn(eventsService, "fetch");
        spyOn(reposService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: blogResponse
            })));
        });

        blogService.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.blogs).toBe(blogMock);
    }));

    it('should add repos to items based on timeline-settings', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, TimelineSettingsService], (eventsService:TimelineEventService, reposService:TimelineRepoService, blogService:TimelineBlogService, settingsService:TimelineSettingsService) => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        settingsService.toggleSetting("githubEvents");
        settingsService.toggleSetting("blogs");

        component.blogs = blogMock;
        component.repos = repoMock;
        component.events = eventMock;

        fixture.detectChanges();

        expect(component.items.length).toBe(component.repos.length);
    }));

    it('should add events to items based on timeline-settings', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, TimelineSettingsService], (eventsService:TimelineEventService, reposService:TimelineRepoService, blogService:TimelineBlogService, settingsService:TimelineSettingsService) => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        settingsService.toggleSetting("githubRepos");
        settingsService.toggleSetting("blogs");

        component.blogs = blogMock;
        component.repos = repoMock;
        component.events = eventMock;

        fixture.detectChanges();

        expect(component.items.length).toBe(component.events.length);
    }));

    it('should add blogs to items based on timeline-settings', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, TimelineSettingsService], (eventsService:TimelineEventService, reposService:TimelineRepoService, blogService:TimelineBlogService, settingsService:TimelineSettingsService) => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        settingsService.toggleSetting("githubRepos");
        settingsService.toggleSetting("githubEvents");

        component.blogs = blogMock;
        component.repos = repoMock;
        component.events = eventMock;

        fixture.detectChanges();

        expect(component.items.length).toBe(component.blogs.length);
    }));
});

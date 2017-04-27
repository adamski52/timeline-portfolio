import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineComponent} from './timeline.component';
import {GithubReposService} from "./github-repos.service";
import {GithubEventsService} from "./github-events.service";
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {ErrorService} from "../../services/error.service";
import {MockBackend} from '@angular/http/testing';
import {RepoLanguagesComponent} from "../repo-language/repo-languages.component";
import {RepoThumbnailComponent} from "../repo-thumbnail/repo-thumbnail.component";
import {TimelineRepoComponent} from "./timeline-repo.component";
import {TickerService} from "../../services/ticker.service";
import {TimelineDateComponent} from "./timeline-date.component";
import {TimelineSettingsService} from "./timeline-settings.service";
import {TimelineBlogComponent} from "./timeline-blog.component";
import {TimelineBlogService} from "./timeline-blog.service";
import {TimelineEventComponent} from "./timeline-event.component";

fdescribe('TimelineComponent', () => {
    let fixture:ComponentFixture<TimelineComponent>,
        component:TimelineComponent,
        response,
        mockArray:any[] = [{
            "lol": "wat"
        }];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TimelineComponent,
                TimelineRepoComponent,
                RepoLanguagesComponent,
                RepoThumbnailComponent,
                TimelineDateComponent,
                TimelineBlogComponent,
                TimelineEventComponent
            ],
            providers: [
                GithubReposService,
                GithubEventsService,
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

    it('should invoke the repos service', inject([GithubReposService], (reposService:GithubReposService) => {
        spyOn(reposService, "fetch");
        fixture = TestBed.createComponent(TimelineComponent);
        fixture.detectChanges();
        expect(reposService.fetch).toHaveBeenCalled();
    }));

    it('should invoke the events service', inject([GithubEventsService], (eventsService:GithubEventsService) => {
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

    it('should respond to the repos service', inject([GithubEventsService, GithubReposService, TimelineBlogService, XHRBackend], (eventsService:GithubEventsService, reposService:GithubReposService, blogService:TimelineBlogService, mockBackend:MockBackend) => {
        spyOn(eventsService, "fetch");
        spyOn(blogService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockArray
            })));
        });

        reposService.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.repos).toBe(mockArray);
    }));


    it('should respond to the events service', inject([GithubEventsService, GithubReposService, TimelineBlogService, XHRBackend], (eventsService:GithubEventsService, reposService:GithubReposService, blogService:TimelineBlogService, mockBackend:MockBackend) => {
        spyOn(reposService, "fetch");
        spyOn(blogService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockArray
            })));
        });

        eventsService.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.events).toBe(mockArray);
    }));

    it('should respond to the blogs service', inject([GithubEventsService, GithubReposService, TimelineBlogService, XHRBackend], (eventsService:GithubEventsService, reposService:GithubReposService, blogService:TimelineBlogService, mockBackend:MockBackend) => {
        spyOn(eventsService, "fetch");
        spyOn(reposService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockArray
            })));
        });

        blogService.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.blogs).toBe(mockArray);
    }));
});

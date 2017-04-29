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
import {ISettings} from "../../interfaces/settings";
import {IBlog} from "../../interfaces/blog";
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";

fdescribe('TimelineComponent', () => {
    let fixture:ComponentFixture<TimelineComponent>,
        component:TimelineComponent,
        response,
        blogMock:IBlog[] = require("../../../../mocks/posts.json"),
        repoMock:IRepo[] = require("../../../../mocks/repos.json"),
        eventMock:IEvent[] = require("../../../../mocks/events.json");

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


    it('should respond to the events service', inject([GithubEventsService, GithubReposService, TimelineBlogService, XHRBackend], (eventsService:GithubEventsService, reposService:GithubReposService, blogService:TimelineBlogService, mockBackend:MockBackend) => {
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

    it('should respond to the blogs service', inject([GithubEventsService, GithubReposService, TimelineBlogService, XHRBackend], (eventsService:GithubEventsService, reposService:GithubReposService, blogService:TimelineBlogService, mockBackend:MockBackend) => {
        spyOn(eventsService, "fetch");
        spyOn(reposService, "fetch");
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: blogMock
            })));
        });

        blogService.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.blogs).toBe(blogMock.items);
    }));

    it('should add repos to items based on settings', inject([GithubEventsService, GithubReposService, TimelineBlogService, TimelineSettingsService], (eventsService:GithubEventsService, reposService:GithubReposService, blogService:TimelineBlogService, settingsService:TimelineSettingsService) => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        settingsService.toggleSetting("githubEvents");
        settingsService.toggleSetting("blogs");

        component.blogs = blogMock.items;
        component.repos = repoMock;
        component.events = eventMock;

        fixture.detectChanges();

        expect(component.items.length).toBe(component.repos.length);
    }));

    it('should add events to items based on settings', inject([GithubEventsService, GithubReposService, TimelineBlogService, TimelineSettingsService], (eventsService:GithubEventsService, reposService:GithubReposService, blogService:TimelineBlogService, settingsService:TimelineSettingsService) => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        settingsService.toggleSetting("githubRepos");
        settingsService.toggleSetting("blogs");

        component.blogs = blogMock.items;
        component.repos = repoMock;
        component.events = eventMock;

        fixture.detectChanges();

        expect(component.items.length).toBe(component.events.length);
    }));

    it('should add blogs to items based on settings', inject([GithubEventsService, GithubReposService, TimelineBlogService, TimelineSettingsService], (eventsService:GithubEventsService, reposService:GithubReposService, blogService:TimelineBlogService, settingsService:TimelineSettingsService) => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        settingsService.toggleSetting("githubRepos");
        settingsService.toggleSetting("githubEvents");

        component.blogs = blogMock.items;
        component.repos = repoMock;
        component.events = eventMock;

        fixture.detectChanges();

        expect(component.items.length).toBe(component.blogs.length);
    }));
});

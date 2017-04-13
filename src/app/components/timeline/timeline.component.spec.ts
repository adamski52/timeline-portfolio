import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineComponent} from './timeline.component';
import {GithubUserService} from "./github-user.service";
import {GithubReposService} from "./github-repos.service";
import {GithubEventsService} from "./github-events.service";
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {ErrorService} from "../../services/error.service";
import {MockBackend} from '@angular/http/testing';
import {RepoLanguagesComponent} from "../repo-language/repo-languages.component";
import {RepoThumbnailComponent} from "../repo-thumbnail/repo-thumbnail.component";

describe('TimelineComponent', () => {
    let fixture:ComponentFixture<TimelineComponent>,
        component:TimelineComponent,
        response,
        mockObj = {
            "lol": "wat"
        },
        mockArray = [mockObj];


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TimelineComponent,
                RepoLanguagesComponent,
                RepoThumbnailComponent
            ],
            providers: [
                GithubUserService,
                GithubReposService,
                GithubEventsService,
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

    it('should invoke the user service', inject([GithubUserService], (userService:GithubUserService) => {
        spyOn(userService, "fetch");
        fixture = TestBed.createComponent(TimelineComponent);
        fixture.detectChanges();
        expect(userService.fetch).toHaveBeenCalled();
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

    it('should respond to the user service', inject([GithubUserService, GithubEventsService, GithubReposService, XHRBackend], (userService:GithubUserService, eventsService:GithubEventsService, reposService:GithubReposService, mockBackend:MockBackend) => {
        spyOn(eventsService, "fetch");
        spyOn(reposService, "fetch");

        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockObj
            })));
        });

        userService.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.user).toBe(mockObj);
    }));


    it('should respond to the repos service', inject([GithubUserService, GithubEventsService, GithubReposService, XHRBackend], (userService:GithubUserService, eventsService:GithubEventsService, reposService:GithubReposService, mockBackend:MockBackend) => {
        spyOn(eventsService, "fetch");
        spyOn(userService, "fetch");

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


    it('should respond to the events service', inject([GithubUserService, GithubEventsService, GithubReposService, XHRBackend], (userService:GithubUserService, eventsService:GithubEventsService, reposService:GithubReposService, mockBackend:MockBackend) => {
        spyOn(userService, "fetch");
        spyOn(reposService, "fetch");

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
});

import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {Component} from '@angular/core';
import {RepoLanguagesComponent} from './repo-languages.component';
import {GenericHttpService} from "../../services/generic-http.service";
import {ErrorService} from "../../services/error.service";
import {HttpModule, RequestMethod, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {GithubRepoLanguagesService} from "./repo-languages.service";
import {TimelineItemService} from "../timeline/timeline-item.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-repo-languages [repo]="'lol'"></jna-repo-languages>`
})
class TestComponent {
}

@Component({
    selector: 'jna-test-component-blank',
    template: `<jna-repo-languages></jna-repo-languages>`
})
class TestComponentBlank {
}

describe('RepoLanguagesComponent', () => {
    let component:RepoLanguagesComponent,
        fixture:ComponentFixture<TestComponent | TestComponentBlank>,
        mockData = {
            "lol": "wat",
            "hello": "goodbye"
        },
        response;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TestComponentBlank,
                RepoLanguagesComponent
            ],
            providers: [
                GenericHttpService,
                GithubRepoLanguagesService,
                TimelineItemService,
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


    it('should call the languages service based on @input', inject([XHRBackend, GithubRepoLanguagesService], (mockBackend:MockBackend, service:GithubRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe("/api/repos/adamski52/lol/languages");
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should not call the languages service if there is no @input', inject([GenericHttpService, XHRBackend], (service:GenericHttpService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TestComponentBlank);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        expect(response).toBeFalsy();
    }));


    it('should respond to the languages service', inject([GenericHttpService, XHRBackend], (service:GenericHttpService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:any) => {
            response = r;
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        expect(component.languages.length).toBe(2);
    }));
});

import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {Component} from '@angular/core';
import {RepoThumbnailComponent} from './repo-thumbnail.component';
import {GenericHttpService} from "../../services/generic-http.service";
import {ErrorService} from "../../services/error.service";
import {HttpModule, RequestMethod, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {GithubRepoThumbnailService} from "./repo-thumbnail.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-repo-thumbnail [repo]="'lol'"></jna-repo-thumbnail>`
})
class TestComponent {
}

@Component({
    selector: 'jna-test-component-blank',
    template: `<jna-repo-thumbnail></jna-repo-thumbnail>`
})
class TestComponentBlank {
}

describe('RepoLanguagesComponent', () => {
    let component:RepoThumbnailComponent,
        fixture:ComponentFixture<TestComponent | TestComponentBlank>,
        mockData = {
            download_url: "/api/repos/adamski52/lol/contents/thumbnail.png"
        },
        response;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TestComponentBlank,
                RepoThumbnailComponent
            ],
            providers: [
                GenericHttpService,
                GithubRepoThumbnailService,
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


    it('should call the thumbnail service based on @input', inject([XHRBackend], (mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe("/api/repos/adamski52/lol/contents/thumbnail.png");
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should not call the thumbnail service if there is no @input', inject([GenericHttpService, XHRBackend], (service:GenericHttpService, mockBackend:MockBackend) => {
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


    it('should respond to the thumbnail service', inject([GenericHttpService, XHRBackend], (service:GenericHttpService, mockBackend:MockBackend) => {
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

        expect(component.thumbnail).toBe(mockData.download_url);
    }));
});

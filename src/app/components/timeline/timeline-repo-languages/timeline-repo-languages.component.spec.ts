import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {Component} from '@angular/core';
import {TimelineRepoLanguagesComponent} from './timeline-repo-languages.component';
import {GenericHttpService} from "../../../services/generic-http.service";
import {ErrorService} from "../../../services/error.service";
import {HttpModule, RequestMethod, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {TimelineRepoLanguagesService} from "./timeline-repo-languages.service";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {ILanguage} from "../../../interfaces/language";
import {TickerService} from "../../../services/ticker.service";

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

describe('TimelineRepoLanguagesComponent', () => {
    let component:TimelineRepoLanguagesComponent,
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
                TimelineRepoLanguagesComponent
            ],
            providers: [
                GenericHttpService,
                TimelineRepoLanguagesService,
                TimelineTitleService,
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


    it('should call the languages service based on @input', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend) => {
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

        expect(response.length).toBe(0)
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

    it('should set the services title to the language on mouseenter', () => {
        let language:ILanguage = {
            name: "lolcode",
            iconClass: "icon-lolcode",
            percentage: 1234
        };

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        let service:TimelineTitleService = fixture.debugElement.children[0].injector.get(TimelineTitleService);
        spyOn(service, "setTitle");

        component.onOver(language);
        expect(service.setTitle).toHaveBeenCalledWith(language.name + " (100%)");
    });

    it('should reset the services title on mouseleave', () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        let service:TimelineTitleService = fixture.debugElement.children[0].injector.get(TimelineTitleService);
        spyOn(service, "reset");

        component.onOut();
        expect(service.reset).toHaveBeenCalled();
    });
});

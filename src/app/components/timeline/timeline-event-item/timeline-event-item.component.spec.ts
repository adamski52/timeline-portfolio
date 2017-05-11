import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineEventComponent} from './timeline-event-item.component';
import {Component} from "@angular/core";
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {TimelineDateComponent} from "../timeline-date/timeline-date.component";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {ErrorService} from "../../../services/error.service";
import {TimelineEventService} from "./timeline-event-item.service";
import {IEvent} from "../../../interfaces/event";
import {TimelineRepoComponent} from "../timeline-repo-item/timeline-repo-item.component";
import {TimelineRepoLanguagesComponent} from "../timeline-repo-languages/timeline-repo-languages.component";
import {TickerService} from "../../../services/ticker.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-event [event]="event"></jna-timeline-event>`,
    providers: [
        TimelineTitleService
    ]
})
class TestComponent {
    public event:IEvent = require("../../../../../mocks/events.json")[4];
}


describe('TimlineEventComponent', () => {
    let component:TimelineEventComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineEventComponent,
                TimelineDateComponent,
                TimelineRepoLanguagesComponent
            ],
            providers: [
                TimelineSettingsService,
                TimelineRepoService,
                ErrorService,
                TimelineEventService,
                TickerService,
                {
                    provide: XHRBackend, useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should set its commit message based on the provided @input event', () => {
        expect(component.commitMessage).toEqual("created branch");
    });

    it('should set its event message based on the provided @input event', () => {
        expect(component.title).toEqual("created refactor/service-streamlining");
    });

    it('should set its repo name based on the provided @input event by mapping to the repos', inject([TimelineRepoService, XHRBackend], (service:TimelineRepoService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: require("../../../../../mocks/repos.json")
            })));
        });

        service.fetch();

        expect(component.repoName).toEqual("timeline-portfolio");  // yo dogg
    }));
});

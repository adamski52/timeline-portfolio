import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {MockBackend} from '@angular/http/testing';
import {Component, Injectable} from "@angular/core";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {IEvent} from "../../../interfaces/event";
import {TimelineEventComponent} from "./timeline-event-item.component";
import {TimelineEventService} from "./timeline-event-item.service";
import {TickerService} from "../../../services/ticker.service";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {ErrorService} from "../../../services/error.service";
import {IRepo} from "../../../interfaces/repo";

@Injectable()
class MockTimelineEventService {
    public getEventMessage(event:IEvent):string {
        return "hello!";
    }

    public getCommitMessage(event:IEvent):string {
        return "goodbye!";
    }
}

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-event [item]="event"></jna-timeline-event>`
})
class TestComponent {
    public event:IEvent[] = require("../../../../../mocks/events.json")[0];
}

fdescribe('TimelineEventComponent', () => {
    let component:TimelineEventComponent,
        fixture:ComponentFixture<TestComponent>,
        repoData:IRepo[] = require("../../../../../mocks/repos.json");

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineEventComponent
            ],
            providers: [
                {
                    provide: TimelineEventService,
                    useClass: MockTimelineEventService
                },
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                TimelineSettingsService,
                TickerService,
                TimelineRepoService,
                ErrorService
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
    }));

    it('should set its title message based on the provided @input event', () => {
        fixture.detectChanges();
        expect(component.title).toEqual("hello!");
    });

    it('should set its summary message based on the provided @input blog', () => {
        fixture.detectChanges();

        expect(component.commitMessage).toEqual("goodbye!");
    });

    it('should set its repo name based on the provided @input blog/repos', inject([TimelineEventService, XHRBackend], (service:TimelineEventService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoData
            })));
        });

        fixture.detectChanges();

        expect(component.repoName).toEqual("wat");
    }));
});

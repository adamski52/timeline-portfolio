import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineEventComponent} from './timeline-event-item.component';
import {Component} from "@angular/core";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {TimelineDateComponent} from "../timeline-date/timeline-date.component";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {HttpModule} from "@angular/http";
import {ErrorService} from "../../../services/error.service";
import {TimelineEventService} from "./timeline-event-item.service";
import {IEvent} from "../../../interfaces/event";

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
                TimelineDateComponent
            ],
            providers: [
                TimelineTitleService,
                TimelineSettingsService,
                TimelineRepoService,
                ErrorService,
                TimelineEventService
            ],
            imports: [
                HttpModule
            ]
        });


    }));

    it('should set its commit message based on the provided @input event', () => {
        TestBed.compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        expect(component.commitMessage).toEqual("created branch");
    });
});

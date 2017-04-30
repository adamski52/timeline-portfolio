import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineEventComponent} from './timeline-event.component';
import {Component} from "@angular/core";
import {TimelineTitleService} from "./timeline-title.service";
import {TimelineDateComponent} from "./timeline-date.component";
import {TimelineSettingsService} from "./timeline-settings.service";
import {GithubReposService} from "./github-repos.service";
import {HttpModule} from "@angular/http";
import {ErrorService} from "../../services/error.service";
import {GithubEventsService} from "./github-events.service";
import {IEvent} from "../../interfaces/event";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-event [event]="event"></jna-timeline-event>`,
    providers: [
        TimelineTitleService
    ]
})
class TestComponent {
    public event:IEvent = require("../../../../mocks/events.json")[4];
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
                GithubReposService,
                ErrorService,
                GithubEventsService
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

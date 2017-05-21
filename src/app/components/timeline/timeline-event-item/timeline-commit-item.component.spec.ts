import {async, ComponentFixture, TestBed,} from '@angular/core/testing';

import {Component} from "@angular/core";
import {HttpModule} from "@angular/http";
import {IEvent} from "../../../interfaces/event";
import {TimelineDateComponent} from "../timeline-date/timeline-date.component";
import {TimelineRepoLanguagesComponent} from "../timeline-repo-languages/timeline-repo-languages.component";
import {TickerService} from "../../../services/ticker.service";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {ErrorService} from "../../../services/error.service";
import {TimelineEventService} from "./timeline-event-item.service";
import {TimelineDateService} from "../timeline-date/timeline-date.service";
import {TimelineCommitComponent} from "./timeline-commit-item.component";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-commit [item]="event"></jna-timeline-commit>`
})
class TestComponent {
    public event:IEvent[] = require("../../../../../mocks/events.json")[0];
}

describe('TimelineCommitComponent', () => {
    let component:TimelineCommitComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineDateComponent,
                TimelineRepoLanguagesComponent,
                TimelineCommitComponent
            ],
            providers: [
                TickerService,
                TimelineSettingsService,
                TimelineRepoService,
                ErrorService,
                TimelineEventService,
                TimelineDateService
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeDefined();
    });
});

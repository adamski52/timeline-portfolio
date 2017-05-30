import {async, ComponentFixture, TestBed,} from '@angular/core/testing';

import {Component} from "@angular/core";
import {HttpModule} from "@angular/http";
import {IEvent} from "../../../interfaces/event";
import {TimelineBranchComponent} from "./timeline-branch-item.component";
import {TimelineDateComponent} from "../timeline-date/timeline-date.component";
import {TimelineRepoLanguagesComponent} from "../timeline-repo-languages/timeline-repo-languages.component";
import {TickerService} from "../../../services/ticker.service";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {ErrorService} from "../../../services/error.service";
import {TimelineEventService} from "./timeline-event-item.service";
import {TimelineDateService} from "../timeline-date/timeline-date.service";
import {AppConfigService} from "../../../services/app-config.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-branch [item]="event"></jna-timeline-branch>`
})
class TestComponent {
    public event:IEvent[] = require("../../../../../mocks/events.json")[4];
}

describe('TimelineBranchComponent', () => {
    let component:TimelineBranchComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineDateComponent,
                TimelineRepoLanguagesComponent,
                TimelineBranchComponent
            ],
            providers: [
                TickerService,
                TimelineSettingsService,
                TimelineRepoService,
                ErrorService,
                TimelineEventService,
                TimelineDateService,
                AppConfigService
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

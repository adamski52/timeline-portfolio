import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineRepoComponent} from './timeline-repo-item.component';
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {Component} from "@angular/core";
import {TimelineRepoLanguagesComponent} from "../timeline-repo-languages/timeline-repo-languages.component";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ErrorService} from "../../../services/error.service";
import {TickerService} from "../../../services/ticker.service";
import {TimelineDateComponent} from "../timeline-date/timeline-date.component";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-repo [repo]="repo"></jna-timeline-repo>`,
    providers: [
        TimelineTitleService
    ]
})
class TestComponent {
    public repo = {
        "name": "lol"
    };
}

describe('TimelineRepoComponent', () => {
    let component:TimelineRepoComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineRepoLanguagesComponent,
                TimelineRepoComponent,
                TimelineDateComponent
            ],
            providers: [
                TimelineTitleService,
                TimelineSettingsService,
                ErrorService,
                TickerService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        });

        TestBed.compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should set its title based on the provided @input repo', () => {
        expect(component.title).toEqual("lol");
    });

});

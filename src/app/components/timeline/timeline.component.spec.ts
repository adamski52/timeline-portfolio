import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {TimelineComponent} from "./timeline.component";
import {TimelineRepoLanguagesComponent} from "./timeline-repo-languages/timeline-repo-languages.component";
import {TimelineBranchComponent} from "./timeline-event-item/timeline-branch-item.component";
import {TickerService} from "../../services/ticker.service";
import {TimelineSettingsService} from "./timeline-settings/timeline-settings.service";
import {TimelineRepoService} from "./timeline-repo-item/timeline-repo-item.service";
import {ErrorService} from "../../services/error.service";
import {TimelineEventService} from "./timeline-event-item/timeline-event-item.service";
import {HttpModule} from "@angular/http";
import {TimelineService} from "./timeline.service";
import {TimelineCommitComponent} from "./timeline-event-item/timeline-commit-item.component";
import {TimelineRepoComponent} from "./timeline-repo-item/timeline-repo-item.component";
import {TimelineBlogComponent} from "./timeline-blog-item/timeline-blog-item.component";
import {TimelineBlogService} from "./timeline-blog-item/timeline-blog-item.service";
import {Component, Injectable} from "@angular/core";
import {IBlog} from "../../interfaces/blog";
import {IEvent} from "../../interfaces/event";
import {IRepo} from "../../interfaces/repo";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline></jna-timeline>`
})
class TestComponent {
}

@Injectable()
class MockTimelineService extends TimelineService {
    public $$repos:IRepo[] = require("../../../../mocks/repos.json");
    public $$events:IEvent[] = require("../../../../mocks/events.json");
    public $$blogs:IBlog[] = require("../../../../mocks/posts.json");

    public fetch() {
        let response = [].concat(this.$$repos, this.$$events, this.$$blogs);
        this.subject.next(response);
    }
}

describe('TimelineComponent', () => {
    let component:TimelineComponent,
        fixture:ComponentFixture<TestComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineComponent,
                TimelineRepoLanguagesComponent,
                TimelineBranchComponent,
                TimelineCommitComponent,
                TimelineRepoComponent,
                TimelineBlogComponent
            ],
            providers: [
                TickerService,
                {
                    provide: TimelineService,
                    useClass: MockTimelineService
                },
                TimelineSettingsService,
                TimelineRepoService,
                TimelineBlogService,
                ErrorService,
                TimelineEventService
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
    }));

    it('should subscribe to the timeline service', () => {
        let timelineService:TimelineService = fixture.debugElement.children[0].injector.get(TimelineService);
        spyOn(timelineService, "subscribe");
        fixture.detectChanges();
        expect(timelineService.subscribe).toHaveBeenCalled();
    });

    it('should respond to the timeline service', () => {
        fixture.detectChanges();
        expect(component.years.length).toBe(50);
    });

    it('should fetch the timeline service', () => {
        let timelineService:TimelineService = fixture.debugElement.children[0].injector.get(TimelineService);
        spyOn(timelineService, "fetch");
        fixture.detectChanges();
        expect(timelineService.fetch).toHaveBeenCalled();
    });
});

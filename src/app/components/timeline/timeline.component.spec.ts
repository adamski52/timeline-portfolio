import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineComponent} from './timeline.component';
import {TimelineRepoService} from "./timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item/timeline-event-item.service";
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {ErrorService} from "../../services/error.service";
import {MockBackend} from '@angular/http/testing';
import {TimelineRepoLanguagesComponent} from "./timeline-repo-languages/timeline-repo-languages.component";
import {TimelineRepoComponent} from "./timeline-repo-item/timeline-repo-item.component";
import {TickerService} from "../../services/ticker.service";
import {TimelineDateComponent} from "./timeline-date/timeline-date.component";
import {TimelineSettingsService} from "./timeline-settings/timeline-settings.service";
import {TimelineBlogComponent} from "./timeline-blog-item/timeline-blog-item.component";
import {TimelineBlogService} from "./timeline-blog-item/timeline-blog-item.service";
import {TimelineEventComponent} from "./timeline-event-item/timeline-event-item.component";
import {IBlog} from "../../interfaces/blog";
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";

describe('TimelineComponent', () => {
    let fixture:ComponentFixture<TimelineComponent>,
        component:TimelineComponent,
        response,
        blogResponse = require("../../../../mocks/posts.json"),
        blogMock:IBlog[] = blogResponse.items,
        repoMock:IRepo[] = require("../../../../mocks/repos.json"),
        eventMock:IEvent[] = require("../../../../mocks/events.json");

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TimelineComponent,
                TimelineRepoComponent,
                TimelineRepoLanguagesComponent,
                TimelineDateComponent,
                TimelineBlogComponent,
                TimelineEventComponent
            ],
            providers: [
                TimelineRepoService,
                TimelineEventService,
                TimelineSettingsService,
                TimelineBlogService,
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


});

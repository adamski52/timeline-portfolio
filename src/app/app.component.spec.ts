import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {TimelineComponent} from "./components/timeline/timeline.component";
import {TimelineRepoService} from "./components/timeline/timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./components/timeline/timeline-event-item/timeline-event-item.service";
import {ErrorService} from "./services/error.service";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {TimelineRepoLanguagesComponent} from "./components/timeline/timeline-repo-languages/timeline-repo-languages.component";
import {TimelineRepoComponent} from "./components/timeline/timeline-repo-item/timeline-repo-item.component";
import {TimelineSettingsComponent} from "./components/timeline/timeline-settings/timeline-settings.component";
import {TimelineSettingsService} from "./components/timeline/timeline-settings/timeline-settings.service";
import {TickerService} from "./services/ticker.service";
import {TimelineDateComponent} from "./components/timeline/timeline-date/timeline-date.component";
import {TimelineEventComponent} from "./components/timeline/timeline-event-item/timeline-event-item.component";
import {TimelineBlogComponent} from "./components/timeline/timeline-blog-item/timeline-blog-item.component";
import {TimelineBlogService} from "./components/timeline/timeline-blog-item/timeline-blog-item.service";
import {TimelineService} from "./components/timeline/timeline.service";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                TimelineComponent,
                TimelineRepoComponent,
                TimelineEventComponent,
                TimelineBlogComponent,
                TimelineSettingsComponent,
                TimelineRepoLanguagesComponent,
                TimelineDateComponent
            ],
            providers: [
                TimelineService,
                TimelineRepoService,
                TimelineEventService,
                TimelineBlogService,
                TimelineSettingsService,
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

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});

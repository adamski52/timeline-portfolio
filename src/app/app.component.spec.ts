import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {TimelineComponent} from "./components/timeline/timeline.component";
import {GithubReposService} from "./components/timeline/github-repos.service";
import {GithubEventsService} from "./components/timeline/github-events.service";
import {ErrorService} from "./services/error.service";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {RepoLanguagesComponent} from "./components/repo-language/repo-languages.component";
import {RepoThumbnailComponent} from "./components/repo-thumbnail/repo-thumbnail.component";
import {TimelineRepoComponent} from "./components/timeline/timeline-repo.component";
import {TimelineSettingsComponent} from "./components/timeline/timeline-settings.component";
import {TimelineSettingsService} from "./components/timeline/timeline-settings.service";
import {TickerService} from "./services/ticker.service";
import {TimelineDateComponent} from "./components/timeline/timeline-date.component";
import {TimelineEventComponent} from "./components/timeline/timeline-event.component";
import {TimelineBlogComponent} from "./components/timeline/timeline-blog.component";
import {TimelineBlogService} from "./components/timeline/timeline-blog.service";

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
                RepoLanguagesComponent,
                RepoThumbnailComponent,
                TimelineDateComponent
            ],
            providers: [
                GithubReposService,
                GithubEventsService,
                TimelineSettingsService,
                TimelineBlogService,
                TickerService,
                ErrorService,
                {
                    provide: XHRBackend, useClass: MockBackend
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

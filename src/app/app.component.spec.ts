import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {TimelineComponent} from "./components/timeline/timeline.component";
import {GithubUserService} from "./components/timeline/github-user.service";
import {GithubReposService} from "./components/timeline/github-repos.service";
import {GithubEventsService} from "./components/timeline/github-events.service";
import {ErrorService} from "./services/error.service";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {RepoLanguagesComponent} from "./components/repo-language/repo-languages.component";
import {RepoThumbnailComponent} from "./components/repo-thumbnail/repo-thumbnail.component";
import {TimelineItemComponent} from "./components/timeline/timeline-item.component";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                TimelineComponent,
                TimelineItemComponent,
                RepoLanguagesComponent,
                RepoThumbnailComponent
            ],
            providers: [
                GithubUserService,
                GithubReposService,
                GithubEventsService,
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

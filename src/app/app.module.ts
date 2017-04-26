import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TimelineComponent} from './components/timeline/timeline.component';
import {ErrorService} from "./services/error.service";
import {RepoLanguagesComponent} from "./components/repo-language/repo-languages.component";
import {RepoThumbnailComponent} from "./components/repo-thumbnail/repo-thumbnail.component";
import {GithubUserService} from "./components/timeline/github-user.service";
import {GithubReposService} from "./components/timeline/github-repos.service";
import {GithubEventsService} from "./components/timeline/github-events.service";
import {TimelineRepoComponent} from "./components/timeline/timeline-repo.component";
import {TickerService} from "./services/ticker.service";
import {TimelineSettingsService} from "./components/timeline/timeline-settings.service";
import {TimelineSettingsComponent} from "./components/timeline/timeline-settings.component";
import {TimelineDateComponent} from "./components/timeline/timeline-date.component";
import {TimelineEventComponent} from "./components/timeline/timeline-event.component";
import {TimelineBlogService} from "./components/timeline/timeline-blog.service";
import {TimelineBlogComponent} from "./components/timeline/timeline-blog.component";

@NgModule({
    declarations: [
        AppComponent,
        TimelineComponent,
        TimelineRepoComponent,
        TimelineEventComponent,
        TimelineBlogComponent,
        RepoLanguagesComponent,
        RepoThumbnailComponent,
        TimelineSettingsComponent,
        TimelineDateComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        ErrorService,
        GithubUserService,
        GithubReposService,
        GithubEventsService,
        TimelineBlogService,
        TickerService,
        TimelineSettingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

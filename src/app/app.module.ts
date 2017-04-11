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

@NgModule({
    declarations: [
        AppComponent,
        TimelineComponent,
        RepoLanguagesComponent,
        RepoThumbnailComponent
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
        GithubEventsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

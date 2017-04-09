import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TimelineComponent} from './components/timeline/timeline.component';
import {GithubEventsService} from "./services/github-events.service";
import {GithubReposService} from "./services/github-repos.service";
import {GithubUserService} from "./services/github-user.service";
import {ErrorService} from "./services/error.service";
import {RepoLanguagesComponent} from "./components/repo-language/repo-languages.component";
import {RepoThumbnailComponent} from "./components/repo-thumbnail/repo-thumbnail.component";
import {GithubGenericService} from "./services/github-generic.service";

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
        GithubEventsService,
        GithubReposService,
        GithubUserService,
        GithubGenericService,
        ErrorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

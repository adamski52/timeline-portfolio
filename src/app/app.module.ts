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
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { IntroComponent } from './components/intro/intro.component';
import {GithubGenericService} from "./services/github-generic.service";
import {RepoLanguagesComponent} from "./components/repo-language/repo-languages.component";
import {GithubRepoLanguagesService} from "./services/github-repo-languages.service";
import {RepoThumbnailComponent} from "./components/repo-thumbnail/repo-thumbnail.component";

@NgModule({
    declarations: [
        AppComponent,
        TimelineComponent,
        AboutComponent,
        ContactComponent,
        IntroComponent,
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
        GithubRepoLanguagesService,
        ErrorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

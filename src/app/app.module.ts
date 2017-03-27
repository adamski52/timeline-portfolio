import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TimelineComponent} from './components/timeline/timeline.component';
import {GithubHttpService} from "./services/github-http.service";
import {GithubEventsService} from "./services/github-events.service";
import {GithubReposService} from "./services/github-repos.service";
import {GithubUserService} from "./services/github-user.service";
import {ErrorService} from "./services/error.service";

@NgModule({
    declarations: [
        AppComponent,
        TimelineComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        GithubHttpService,
        GithubEventsService,
        GithubReposService,
        GithubUserService,
        ErrorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

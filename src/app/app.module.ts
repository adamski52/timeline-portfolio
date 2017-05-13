import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TimelineComponent} from "./components/timeline/timeline.component";
import {TimelineBlogComponent} from "./components/timeline/timeline-blog-item/timeline-blog-item.component";
import {TimelineBlogService} from "./components/timeline/timeline-blog-item/timeline-blog-item.service";
import {TimelineDateComponent} from "./components/timeline/timeline-date/timeline-date.component";
import {
    TimelineBranchComponent,
    TimelineCommitComponent
} from "./components/timeline/timeline-event-item/timeline-event-item.component";
import {TimelineEventService} from "./components/timeline/timeline-event-item/timeline-event-item.service";
import {TimelineTitleService} from "./components/timeline/timeline-item-title/timeline-item-title.service";
import {TimelineRepoComponent} from "./components/timeline/timeline-repo-item/timeline-repo-item.component";
import {TimelineRepoService} from "./components/timeline/timeline-repo-item/timeline-repo-item.service";
import {TimelineRepoLanguagesComponent} from "./components/timeline/timeline-repo-languages/timeline-repo-languages.component";
import {TimelineRepoLanguagesService} from "./components/timeline/timeline-repo-languages/timeline-repo-languages.service";
import {TimelineSettingsComponent} from "./components/timeline/timeline-settings/timeline-settings.component";
import {TimelineSettingsService} from "./components/timeline/timeline-settings/timeline-settings.service";
import {ErrorService} from "./services/error.service";
import {TickerService} from "./services/ticker.service";
import {TimelineService} from "./components/timeline/timeline.service";

@NgModule({
    declarations: [
        AppComponent,
        TimelineComponent,
        TimelineBlogComponent,
        TimelineDateComponent,
        TimelineCommitComponent,
        TimelineBranchComponent,
        TimelineRepoComponent,
        TimelineRepoLanguagesComponent,
        TimelineSettingsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        TimelineService,
        TimelineBlogService,
        TimelineEventService,
        TimelineTitleService,
        TimelineRepoService,
        TimelineRepoLanguagesService,
        TimelineSettingsService,
        ErrorService,
        TickerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

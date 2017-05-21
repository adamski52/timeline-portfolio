import {Component} from '@angular/core';

import {TimelineEventComponent} from "./timeline-event-item.component";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item.service";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";

@Component({
    selector: 'jna-timeline-commit',
    templateUrl: './timeline-commit-item.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineCommitComponent extends TimelineEventComponent {
    constructor(settingsService:TimelineSettingsService,
                reposService:TimelineRepoService,
                eventsService:TimelineEventService,
                titleService:TimelineTitleService) {
        super(settingsService, reposService, eventsService, titleService);
    }
}

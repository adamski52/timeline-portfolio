import {Component} from '@angular/core';

import {TimelineEventComponent} from "./timeline-event-item.component";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item.service";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";

@Component({
    selector: 'jna-timeline-branch',
    templateUrl: './timeline-branch-item.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineBranchComponent extends TimelineEventComponent {
    constructor(reposService:TimelineRepoService,
                eventsService:TimelineEventService,
                titleService:TimelineTitleService) {
        super(reposService, eventsService, titleService);
    }
}

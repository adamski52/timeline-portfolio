import {Component} from '@angular/core';
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";
import {IBlog} from "../../interfaces/blog";
import {TimelineService} from "./timeline.service";
import {TimelineEventService} from "./timeline-event-item/timeline-event-item.service";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent {
    public items:(IRepo|IEvent|IBlog)[] = [];

    constructor(private timelineService:TimelineService) {
        this.timelineService.subscribe((items:(IRepo|IBlog|IEvent)[]) => {
           this.items = items;
        });

        this.timelineService.fetch();
    }
}

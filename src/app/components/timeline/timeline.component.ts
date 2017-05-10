import {Component} from '@angular/core';
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";
import {IBlog} from "../../interfaces/blog";
import {TimelineService} from "./timeline.service";

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

    public isItemRepo(item:IRepo|IEvent|IBlog):boolean {
        return this.timelineService.isItemRepo(item);
    }

    public isItemBlog(item:IRepo|IEvent|IBlog):boolean {
        return this.timelineService.isItemBlog(item);
    }

    public isItemEvent(item:IRepo|IEvent|IBlog):boolean {
        return this.timelineService.isItemEvent(item);
    }

    public isCreateEvent(item:IEvent):boolean {
        return this.timelineService.isCreateEvent(item);
    }
}

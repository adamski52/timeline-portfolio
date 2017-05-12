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

    constructor(private timelineService:TimelineService,
                private eventsService:TimelineEventService) {

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

    public getItemClass(item:IRepo|IEvent|IBlog, isEven:boolean) {
        let classObj = {
            "even": isEven,
            "odd": !isEven
        };

        if(this.isItemBlog(item)) {
            classObj["theme-blog"] = true;
            return classObj;
        }

        if(this.isItemRepo(item)) {
            classObj["theme-repo"] = true;
            return classObj;
        }

        if(this.isItemEvent(item)) {
            if(this.eventsService.isCreateEvent(<IEvent>item)) {
                classObj["theme-branch"] = true;
                return classObj;
            }

            classObj["theme-commit"] = true;
            return classObj;
        }

        return classObj;
    }
}

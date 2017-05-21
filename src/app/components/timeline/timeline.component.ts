import {Component, OnInit} from '@angular/core';
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";
import {IBlog} from "../../interfaces/blog";
import {TimelineService} from "./timeline.service";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {
    public items:(IRepo|IEvent|IBlog)[] = [];

    constructor(private timelineService:TimelineService) {}

    ngOnInit() {
        this.timelineService.subscribe((items:(IRepo|IBlog|IEvent)[]) => {
           this.items = items;
        });

        this.timelineService.fetch();
    }
}

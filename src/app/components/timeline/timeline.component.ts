import {Component, OnInit} from '@angular/core';
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";
import {IBlog} from "../../interfaces/blog";
import {TimelineService} from "./timeline.service";
import {IYearCollection} from "../../interfaces/sorted-item-collection";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {
    public years:IYearCollection[] = [];

    constructor(private timelineService:TimelineService) {}

    ngOnInit() {
        this.timelineService.subscribe((years:IYearCollection[]) => {
           this.years = years;
        });

        this.timelineService.fetch();
    }
}

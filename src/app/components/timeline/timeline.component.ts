import {Component} from '@angular/core';
import {IUser, IRepo, IEvent} from "../../interfaces/interfaces";
import {TimelineService} from "../../services/timeline.service";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent {

    public user:IUser;
    public repos:IRepo[];
    public events:IEvent[];

    constructor(private timelineService:TimelineService) {
        this.timelineService.fetch();
    }
}

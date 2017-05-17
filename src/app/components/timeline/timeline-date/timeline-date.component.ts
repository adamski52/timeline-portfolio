import {Component, Input, OnInit} from '@angular/core';
import {TimelineDateService} from "./timeline-date.service";
import {IDate} from "../../../interfaces/date";

@Component({
    selector: 'jna-timeline-date',
    templateUrl: './timeline-date.component.html'
})
export class TimelineDateComponent implements OnInit {
    @Input("date") rawDate:Date;

    public month:string;
    public date:string;
    public year:string;

    constructor(private dateService:TimelineDateService) {}

    ngOnInit() {
        let d:IDate = this.dateService.getDate(this.rawDate);
        this.month = d.month;
        this.date = d.date;
        this.year = d.year;
    }
}

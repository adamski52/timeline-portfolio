import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'jna-timeline-date',
    templateUrl: './timeline-date.component.html',
})
export class TimelineDateComponent implements OnInit {
    @Input("date") fullDate:Date;

    private months:string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    public month:string;
    public date:string;
    public year:string;

    ngOnInit() {
        this.fullDate = new Date(this.fullDate);
        this.month = this.months[this.fullDate.getMonth()];

        this.date = this.fullDate.getDate() + "";
        if(this.date.length < 2) {
            this.date = "0" + this.date;
        }

        this.year = this.fullDate.getFullYear() + "";
    }
}

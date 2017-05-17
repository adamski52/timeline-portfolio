import {Injectable} from '@angular/core';
import {IDate} from "../../../interfaces/date";

@Injectable()
export class TimelineDateService {
    private months:string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    public getDate(rawDate:Date|string|number):IDate {
        let fullDate:any = rawDate,
            date:Date = new Date(fullDate),
            m:string = this.months[date.getMonth()],
            d:string = date.getDate() + "",
            y:string = date.getFullYear() + "";

        if(d.length < 2) {
            d = "0" + d;
        }

        return {
            month: m,
            date: d,
            year: y
        };
    }
}

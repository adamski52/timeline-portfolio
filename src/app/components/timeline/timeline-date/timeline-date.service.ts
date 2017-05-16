import {Injectable} from '@angular/core';
import {IDate} from "../../../interfaces/date";

@Injectable()
export class TimelineDateService {
    private months:string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    public getDate(fullDate:Date|string|number):IDate {
        let date:Date = new Date(fullDate),
            month:string = this.months[this.fullDate.getMonth()],
            date:string = this.fullDate.getDate() + "",
            year:string = date.getFullYear() + "";

        if(date.length < 2) {
            date = "0" + date;
        }
        return {
            month: month,
            date: date,
            year: year
        };
    }
}

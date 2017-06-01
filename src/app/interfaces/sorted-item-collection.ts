import {IBlog} from "./blog";
import {IRepo} from "./repo";
import {IEvent} from "./event";

export interface IDateCollection {
    date: string;
    items: (IBlog|IRepo|IEvent)[];
}

export interface IMonthCollection {
    month: string;
    dates: IDateCollection[];
}

export interface IYearCollection {
    year: string;
    months: IMonthCollection[]
}

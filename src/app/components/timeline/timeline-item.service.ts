import {Injectable} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";

@Injectable()
export class TimelineItemService {
    private _observer: Observer<string>;

    private data$: Observable<string> = new Observable((observer) => {
        this._observer = observer;
    }).share();

    public subscribe(handler:(value: string) => void):Subscription {
        return this.data$.subscribe(handler);
    }

    public set title(t:string) {
        console.log("LOL", t);
        if(this._observer) {
            console.log("set title to", t);
            this._observer.next(t);
        }
    }
}

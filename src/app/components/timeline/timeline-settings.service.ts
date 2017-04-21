import {Injectable} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";

@Injectable()
export class TimelineSettingsService {
    private _observer: Observer<string>;
    private _settings:any = {};

    private data$: Observable<any> = new Observable((observer) => {
        this._observer = observer;
    }).share();

    public subscribe(handler:(value: any) => void):Subscription {
        return this.data$.subscribe(handler);
    }

    public setSetting(key:string, value:any):void {
        this._settings[key] = value;
        this._observer.next(this._settings);
    }

    public getSettings():any {
        return this._settings;
    }


}

import {Injectable} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";

@Injectable()
export class TimelineSettingsService {
    private _observer: Observer<string>;
    private _settings:any = {
        "githubEvents": true,
        "githubRepos": true,
        "tweets": true,
        "blogs": true,
        "experiments": true
    };

    private data$: Observable<any> = new Observable((observer) => {
        this._observer = observer;
    }).share();

    private broadcast():void {
        if(this._observer) {
            this._observer.next(this._settings);
        }
    }

    public subscribe(handler:(value: any) => void):Subscription {
        let subscription:Subscription = this.data$.subscribe(handler);
        this.broadcast();
        return subscription;
    }

    public toggleSetting(key:string):void {
        this._settings[key] = !this._settings[key];
        this.broadcast();
    }
}

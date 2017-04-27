import {Injectable} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class TimelineSettingsService {
    private _settings:any = {
        "githubEvents": true,
        "githubRepos": true,
        "tweets": true,
        "blogs": true,
        "experiments": true
    };

    protected subject:BehaviorSubject<any> = new BehaviorSubject(this._settings);

    public subscribe(handler:(value: any) => void):Subscription {
        return this.subject.subscribe(handler);
    }

    public toggleSetting(key:string):void {
        this._settings[key] = !this._settings[key];
        this.subject.next(this._settings);
    }
}

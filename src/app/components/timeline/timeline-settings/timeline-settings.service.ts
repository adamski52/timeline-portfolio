import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ISettings} from "../../../interfaces/settings";

@Injectable()
export class TimelineSettingsService {
    private _settings:ISettings = {
        "githubEvents": true,
        "githubRepos": true,
        "tweets": true,
        "blogs": true,
        "experiments": true
    };

    protected subject:BehaviorSubject<ISettings> = new BehaviorSubject(this._settings);

    constructor() {
        this.subject.next(this._settings);
    }

    public subscribe(handler:(value: ISettings) => void):Subscription {
        return this.subject.subscribe(handler);
    }

    public toggleSetting(key:string):void {
        this._settings[key] = !this._settings[key];
        this.subject.next(this._settings);
    }
}

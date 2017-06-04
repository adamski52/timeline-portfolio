import { EventManager } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {IAppConfig} from "../interfaces/app-config";

@Injectable()
export class AppConfigService {
    private MOBILE_MAX_WIDTH:number = 600;

    private config:IAppConfig = {
        isMobile: false
    };

    protected subject:BehaviorSubject<IAppConfig> = new BehaviorSubject(this.config);

    constructor(private eventManager:EventManager) {
        this.eventManager.addGlobalEventListener('window', 'load', (e:Event) => {
            this.onResize(e);
        });

        this.eventManager.addGlobalEventListener('window', 'resize', (e:Event) => {
            this.onResize(e);
        });
    }

    public subscribe(handler:(value:IAppConfig) => void):Subscription {
        return this.subject.subscribe(handler);
    }

    public getHtmlUrl(apiUrl:string):string {
        apiUrl = apiUrl.replace(/api\./g, "www.");
        apiUrl = apiUrl.replace(/\/repos/g, "");
        apiUrl = apiUrl.replace(/\/commits/g, "/commit");
        return apiUrl;
    }

    private onResize(e:any) {
        this.config.isMobile = e.currentTarget.innerWidth < this.MOBILE_MAX_WIDTH;

        this.subject.next(this.config);
    }
}

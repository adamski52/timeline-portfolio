import {Component} from '@angular/core';
import {TimelineSettingsService} from "./timeline-settings.service";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {ISettings} from "../../../interfaces/settings";

@Component({
    selector: 'jna-timeline-settings',
    templateUrl: './timeline-settings.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineSettingsComponent {
    private titleMap = {
        commits: "Github Events",
        branches: "Github Branches",
        repos: "Github Repos",
        experiments: "Experiments",
        tweets: "Tweets",
        blogs: "Blogs"
    };

    public settings:ISettings;
    public title:string = "";

    constructor(private settingsService:TimelineSettingsService, private titleService:TimelineTitleService) {
        this.settingsService.subscribe((settings: ISettings) => {
            this.settings = settings;
        });

        this.titleService.subscribe("", (t: string) => {
            this.title = t;
        });
    }

    onHover(key:string):void {
        let prefix:string = this.settings[key] ? "Hide" : "Show",
            title = this.titleMap[key];

        this.titleService.setTitle(prefix + " " + title);
    }

    onOut():void {
        this.titleService.reset();
    }

    onClick(e:Event, key:string):void {
        e.preventDefault();
        this.toggleSetting(key);
    }

    toggleSetting(key:string):void {
        this.settingsService.toggleSetting(key);
    }

    getIconClass(key:string) {
        return {
            "jna-icon-disabled": !this.settings[key]
        };
    }
}

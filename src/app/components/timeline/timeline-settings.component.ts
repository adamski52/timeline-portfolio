import {Component, OnInit} from '@angular/core';
import {TimelineSettingsService} from "./timeline-settings.service";
import {TimelineTitleService} from "./timeline-title.service";

@Component({
    selector: 'jna-timeline-settings',
    templateUrl: './timeline-settings.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineSettingsComponent implements OnInit {
    private titleMap = {
        githubEvents: "Github Events",
        githubRepos: "Github Repos",
        experiments: "Experiments",
        tweets: "Tweets",
        blogs: "Blogs"
    };

    public settings:any = {};
    public title:string = "";

    constructor(private settingsService:TimelineSettingsService, private titleService:TimelineTitleService) {}

    ngOnInit() {
        this.settingsService.subscribe((settings: any) => {
            this.settings = settings;
        });

        this.titleService.subscribe("", false, (t:string) => {
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

    toggleSetting(key:string):void {
        this.settingsService.toggleSetting(key);
    }

    getIconClass(key:string) {
        return {
            "jna-icon-disabled": !this.settings[key]
        };
    }
}

import {Component, OnInit} from '@angular/core';
import {TimelineSettingsService} from "./timeline-settings.service";

@Component({
    selector: 'jna-timeline-settings',
    templateUrl: './timeline-settings.component.html'
})
export class TimelineSettingsComponent implements OnInit {
    public settings:any = {};

    constructor(private settingsService:TimelineSettingsService) {}

    ngOnInit() {
        this.settingsService.subscribe((settings: any) => {
            this.settings = settings;
        });
    }

    toggleSetting(key:string):void {
        this.settingsService.toggleSetting(key);
    }

    getIconClass(key:string) {
        return {
            "icon-disabled": !this.settings[key]
        };
    }
}

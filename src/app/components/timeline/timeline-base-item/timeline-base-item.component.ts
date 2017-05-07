import {Component, Input, HostBinding, OnInit} from '@angular/core';
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {ISettings} from "../../../interfaces/settings";

@Component({
    selector: 'jna-timeline-item',
    template: `<ng-content></ng-content>`
})
export class TimelineBaseItemComponent implements OnInit {
    protected settingsKey:string = "";
    protected classSuffix:string = "";

    @HostBinding("class.is-hidden") isHidden:boolean = false;
    @HostBinding("class.even")
    @Input("isEven") isEven:boolean;

    constructor(private settingsService:TimelineSettingsService) {}

    protected watchForSettings():void {
        this.settingsService.subscribe((settings:ISettings) => {
            this.isHidden = !settings[this.settingsKey];
        });
    }

    public getIconClass() {
        let classObj = {};
        classObj["jna-icon-" + this.classSuffix] = true;
        return classObj;
    }

    public getConnectorClasses() {
        let classObj = {};
        if(this.isEven) {
            classObj["top-right"] = true;
            classObj["bottom-left"] = true;
        }
        else {
            classObj["top-left"] = true;
            classObj["bottom-right"] = true;
        }
        return classObj;
    }

    public ngOnInit() {
        this.watchForSettings();
    }
}

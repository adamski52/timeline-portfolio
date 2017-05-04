import {Component, Input, HostBinding} from '@angular/core';
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {ISettings} from "../../../interfaces/settings";

@Component({
    selector: 'jna-timeline-item',
    template: `<ng-content></ng-content>`
})
export class TimelineBaseItemComponent {
    protected settingsKey:string = "";
    protected classSuffix:string = "";

    @HostBinding("class.is-hidden") isHidden:boolean = false;

    constructor(private settingsService:TimelineSettingsService) {}

    protected watchForSettings(settingsKey:string, classSuffix:string):void {
        this.settingsKey = settingsKey;
        this.classSuffix = classSuffix;

        this.settingsService.subscribe((settings:ISettings) => {
            this.isHidden = !settings[this.settingsKey];
        });
    }

    public getIconClass() {
        let classObj = {};
        classObj["jna-icon-" + this.classSuffix] = true;
        return classObj;
    }
}
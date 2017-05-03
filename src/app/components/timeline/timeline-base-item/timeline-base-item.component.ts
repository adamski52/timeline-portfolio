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

    @Input("isEven") isEven:boolean;

    constructor(private settingsService:TimelineSettingsService) {
        this.settingsService.subscribe((settings:ISettings) => {
            this.isHidden = !settings[this.settingsKey];
        });
    }

    public getIconClass() {
        let classObj = {};
        classObj["jna-icon-" + this.classSuffix] = !this.isEven;
        classObj["jna-icon-reverse-" + this.classSuffix] = this.isEven;
        return classObj;
    }
}

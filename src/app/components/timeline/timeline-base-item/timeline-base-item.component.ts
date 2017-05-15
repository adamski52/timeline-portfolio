import {Component, Input, HostBinding, OnInit} from '@angular/core';
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {ISettings} from "../../../interfaces/settings";
import {IRepo} from "../../../interfaces/repo";
import {IEvent} from "../../../interfaces/event";
import {IBlog} from "../../../interfaces/blog";

@Component({
    selector: 'jna-timeline-item',
    template: `<ng-content></ng-content>`
})
export class TimelineBaseItemComponent implements OnInit {
    @HostBinding("class.is-hidden")
    public isHidden:boolean = false;

    @Input("isEven")
    public isEven:boolean;

    @Input("item")
    public item:IRepo|IEvent|IBlog;

    constructor(private settingsService:TimelineSettingsService) {}

    protected watchForSettings():void {
        this.settingsService.subscribe((settings:ISettings) => {
            this.isHidden = !settings[this.item.$$type];
        });
    }

    public ngOnInit() {
        this.watchForSettings();
    }
}

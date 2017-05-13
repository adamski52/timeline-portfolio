import {Component, Input, OnInit} from '@angular/core';
import {IBlog} from "../../../interfaces/blog";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {TimelineBaseItemComponent} from "../timeline-base-item/timeline-base-item.component";

@Component({
    selector: 'jna-timeline-blog',
    templateUrl: './timeline-blog-item.component.html'
})
export class TimelineBlogComponent extends TimelineBaseItemComponent implements OnInit {
    public title:string;
    public summary:string;

    constructor(settingsService:TimelineSettingsService) {
        super(settingsService);
    }

    ngOnInit() {
        this.watchForSettings();
        this.title = (<IBlog>this.item).title;
        this.summary = (<IBlog>this.item).content;
    }
}

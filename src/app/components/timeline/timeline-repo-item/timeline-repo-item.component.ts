import {Component, Input, OnInit} from '@angular/core';
import {IRepo} from "../../../interfaces/repo";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {TimelineBaseItemComponent} from "../timeline-base-item/timeline-base-item.component";

@Component({
    selector: 'jna-timeline-repo',
    templateUrl: './timeline-repo-item.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineRepoComponent extends TimelineBaseItemComponent implements OnInit {
    public title:string;

    constructor(private titleService:TimelineTitleService, settingsService:TimelineSettingsService) {
        super(settingsService);
    }

    ngOnInit() {
        this.watchForSettings();
        this.title = (<IRepo>this.item).name;
        this.titleService.subscribe(this.title, this.isEven, (t:string) => {
            this.title = t;
        });
    }
}

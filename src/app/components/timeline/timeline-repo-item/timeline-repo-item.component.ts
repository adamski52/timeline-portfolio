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
    @Input("repo") repo:IRepo;

    public title:string;

    constructor(private titleService:TimelineTitleService, settingsService:TimelineSettingsService) {
        super(settingsService);
        this.settingsKey = "githubRepos";
        this.classSuffix = "github";
    }

    ngOnInit() {
        this.titleService.subscribe(this.repo.name, false, (t:string) => {
            this.title = t;
        });
        this.title = this.repo.name;
    }
}

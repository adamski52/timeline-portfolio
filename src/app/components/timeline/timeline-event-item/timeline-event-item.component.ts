import {Component, Input, OnInit} from '@angular/core';
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {IEvent} from "../../../interfaces/event";
import {IRepo} from "../../../interfaces/repo";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item.service";
import {TimelineBaseItemComponent} from "../timeline-base-item/timeline-base-item.component";

@Component({
    selector: 'jna-timeline-event',
    template: '<ng-content></ng-content>',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineEventComponent extends TimelineBaseItemComponent implements OnInit {
    public repoName:string;
    public title:string;
    public commitMessage:string;

    constructor(settingsService:TimelineSettingsService,
                private reposService:TimelineRepoService,
                private eventsService:TimelineEventService,
                private titleService:TimelineTitleService) {
        super(settingsService);
    }

    ngOnInit() {
        console.log("ITEM", this.item);
        this.watchForSettings();

        this.title = this.eventsService.getEventMessage(<IEvent>this.item);
        this.commitMessage = this.eventsService.getCommitMessage(<IEvent>this.item);

        this.reposService.subscribe((repos: IRepo[]) => {
            let repo: IRepo = repos.find((r: IRepo) => {
                return r.id === (<IEvent>this.item).repo.id;
            });

            if (repo) {
                this.repoName = repo.name;
                this.titleService.subscribe(this.repoName, this.isEven, (t: string) => {
                    this.repoName = t;
                });
            }
        });
    }
}

@Component({
    selector: 'jna-timeline-commit',
    templateUrl: './timeline-commit-item.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineCommitComponent extends TimelineEventComponent {
    constructor(settingsService:TimelineSettingsService,
                reposService:TimelineRepoService,
                eventsService:TimelineEventService,
                titleService:TimelineTitleService) {
        super(settingsService, reposService, eventsService, titleService);
    }
}

@Component({
    selector: 'jna-timeline-branch',
    templateUrl: './timeline-branch-item.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineBranchComponent extends TimelineEventComponent {
    constructor(settingsService:TimelineSettingsService,
                reposService:TimelineRepoService,
                eventsService:TimelineEventService,
                titleService:TimelineTitleService) {
        super(settingsService, reposService, eventsService, titleService);
    }
}

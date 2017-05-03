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
    templateUrl: './timeline-event-item.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineEventComponent extends TimelineBaseItemComponent implements OnInit {
    @Input("event") event:IEvent;

    public repoName:string;
    public eventMessage:string;
    public commitMessage:string;

    constructor(settingsService:TimelineSettingsService,
                private reposService:TimelineRepoService,
                private eventsService:TimelineEventService) {

        super(settingsService);
        this.settingsKey = "githubEvents";
        this.classSuffix = "code-fork";
    }

    ngOnInit() {
        this.watchForSettings();

        this.reposService.subscribe((repos: IRepo[]) => {
            let repo:IRepo = repos.find((r:IRepo) => {
                return r.id === this.event.repo.id;
            });

            if(repo) {
                this.repoName = repo.name;
            }
        });

        this.eventMessage = this.eventsService.getEventMessage(this.event);
        this.commitMessage = this.eventsService.getCommitMessage(this.event);
    }
}

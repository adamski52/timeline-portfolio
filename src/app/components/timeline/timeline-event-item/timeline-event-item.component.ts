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
    public title:string;
    public commitMessage:string;

    constructor(settingsService:TimelineSettingsService,
                private reposService:TimelineRepoService,
                private eventsService:TimelineEventService,
                private titleService:TimelineTitleService) {
        super(settingsService);
    }

    ngOnInit() {
        if(this.eventsService.isCreateEvent(this.event)) {
            this.settingsKey = "branches";
            this.classSuffix = "github-square";
        }
        else {
            this.settingsKey = "commits";
            this.classSuffix = "code-fork";
        }

        this.watchForSettings();

        this.title = this.eventsService.getEventMessage(this.event);
        this.commitMessage = this.eventsService.getCommitMessage(this.event);

        this.reposService.subscribe((repos: IRepo[]) => {
            let repo: IRepo = repos.find((r: IRepo) => {
                return r.id === this.event.repo.id;
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

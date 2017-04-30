import {Component, Input, OnInit, HostBinding} from '@angular/core';
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {IEvent} from "../../../interfaces/event";
import {IRepo} from "../../../interfaces/repo";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item.service";

@Component({
    selector: 'jna-timeline-event',
    templateUrl: './timeline-event-item.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineEventComponent implements OnInit {
    @HostBinding("class.is-hidden") isHidden:boolean = false;

    @Input("event") event:IEvent;
    @Input("isEven") isEven:boolean;

    public repoName:string;
    public eventMessage:string;
    public commitMessage:string;

    constructor(private settingsService:TimelineSettingsService,
                private reposService:TimelineRepoService,
                private eventsService:TimelineEventService) {

        this.settingsService.subscribe((settings:any) => {
            this.isHidden = !settings.githubEvents;
        });
    }

    getIconClass() {
        return {
            "jna-icon-code-fork": !this.isEven,
            "jna-icon-reverse-code-fork": this.isEven
        };
    }

    ngOnInit() {
        this.reposService.subscribe((repos: IRepo[]) => {
            if(repos.length <= 0) {
                return;
            }

            let repo:IRepo = repos.find((repo: IRepo) => {
                return repo.id === this.event.repo.id;
            });

            this.repoName = repo.name;
        });


        this.eventMessage = this.eventsService.getEventMessage(this.event);
        this.commitMessage = this.eventsService.getCommitMessage(this.event);
    }
}

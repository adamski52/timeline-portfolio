import {Component, Input, OnInit} from '@angular/core';
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {IEvent} from "../../../interfaces/event";
import {IRepo} from "../../../interfaces/repo";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item.service";
import {Subscription} from "rxjs/Subscription";
import {AppConfigService} from "../../../services/app-config.service";

@Component({
    selector: 'jna-timeline-event',
    template: '<ng-content></ng-content>',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineEventComponent implements OnInit {
    protected subscription:Subscription;

    @Input("item")
    public item:IEvent;

    public repoName:string;
    public title:string;
    public commitMessage:string;

    constructor(private reposService:TimelineRepoService,
                private eventsService:TimelineEventService,
                private titleService:TimelineTitleService,
                private appConfigService:AppConfigService) {
    }

    ngOnInit() {
        this.title = this.eventsService.getEventMessage(<IEvent>this.item);
        this.commitMessage = this.eventsService.getCommitMessage(<IEvent>this.item);

        this.titleService.subscribe(this.title, (t: string) => {
            this.repoName = t;
        });

        this.appConfigService.subscribe(() => {
            this.titleService.setOrientation(this.item.$$isEven);
        });

        this.reposService.subscribe((repos: IRepo[]) => {
            let repo: IRepo = repos.find((r: IRepo) => {
                return r.id === (<IEvent>this.item).repo.id;
            });

            if (repo) {
                this.repoName = repo.name;
            }
        });
    }

    getHtmlUrl(apiUrl:string):string {
        return this.appConfigService.getHtmlUrl(apiUrl);
    }
}

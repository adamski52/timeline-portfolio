import {Component, Input, OnInit} from '@angular/core';
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {IEvent} from "../../../interfaces/event";
import {IRepo} from "../../../interfaces/repo";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item.service";

@Component({
    selector: 'jna-timeline-event',
    template: '<ng-content></ng-content>',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineEventComponent  implements OnInit {
    @Input("item")
    public item:IEvent;

    public repoName:string;
    public title:string;
    public commitMessage:string;

    constructor(private reposService:TimelineRepoService,
                private eventsService:TimelineEventService,
                private titleService:TimelineTitleService) {
    }

    ngOnInit() {
        this.title = this.eventsService.getEventMessage(<IEvent>this.item);
        this.commitMessage = this.eventsService.getCommitMessage(<IEvent>this.item);

        this.reposService.subscribe((repos: IRepo[]) => {
            let repo: IRepo = repos.find((r: IRepo) => {
                return r.id === (<IEvent>this.item).repo.id;
            });

            if (repo) {
                this.repoName = repo.name;
                this.titleService.subscribe(this.repoName, this.item.$$isEven, (t: string) => {
                    this.repoName = t;
                });
            }
        });
    }
}

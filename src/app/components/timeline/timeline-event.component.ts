import {Component, Input, OnInit, HostBinding} from '@angular/core';
import {TimelineTitleService} from "./timeline-title.service";
import {TimelineSettingsService} from "./timeline-settings.service";
import {IEvent} from "../../interfaces/event";
import {IRepo} from "../../interfaces/repo";
import {GithubReposService} from "./github-repos.service";

@Component({
    selector: 'jna-timeline-event',
    templateUrl: './timeline-event.component.html',
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
                private reposService:GithubReposService) {

        this.settingsService.subscribe((settings:any) => {
            this.isHidden = !settings.githubEvents;
        });
    }

    private getEventMessage():string {
        console.log("after", this.event);
        if(this.event.type === "PushEvent") {
            return "pushed to " + this.event.payload.ref;
        }

        if(this.event.type === "CreateEvent") {
            return "created " + this.event.payload.ref;
        }

        // TODO
        return "???";
    }

    private getCommitMessage():string {
        if(this.event.type === "PushEvent") {
            return this.event.payload.commits[0].message
        }

        return "";
    }

    getIconClass() {
        return {
            "jna-icon-heart": !this.isEven,
            "jna-icon-reverse-heart": this.isEven
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

        console.log("before", this.event);
        this.eventMessage = this.getEventMessage();
        this.commitMessage = this.getCommitMessage();
    }
}

import {Component, Input, OnInit, HostBinding} from '@angular/core';
import {TimelineTitleService} from "./timeline-title.service";
import {TimelineSettingsService} from "./timeline-settings.service";
import {IEvent} from "../../interfaces/event";
import {IRepo} from "../../interfaces/repo";
import {GithubReposService} from "./github-repos.service";

@Component({
    selector: 'jna-timeline-event',
    templateUrl: './timeline-repo.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineEventComponent implements OnInit {
    @HostBinding("class.is-hidden") isHidden:boolean = false;

    @Input("event") event:IEvent;
    @Input("isEven") isEven:boolean;

    public title:string;
    private repo:IRepo;

    constructor(private titleService:TimelineTitleService,
                private settingsService:TimelineSettingsService,
                private reposService:GithubReposService) {

        this.settingsService.subscribe((settings:any) => {
            this.isHidden = !settings.githubRepos;
        });

        this.reposService.subscribe((repos:IRepo[]) => {
            this.repo = repos.find((r:IRepo) => {
                return r.id === this.event.repo.id;
            });
        });
    }

    getIconClass() {
        return {
            "jna-icon-github": !this.isEven,
            "jna-icon-reverse-github": this.isEven
        };
    }

    ngOnInit() {
        let title:string = this.repo.name + " / " + this.event.payload.commits[0].message;

        this.titleService.subscribe(title, this.isEven, (t:string) => {
            this.title = t;
        });

        this.title = title;
    }
}

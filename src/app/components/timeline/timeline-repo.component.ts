import {Component, Input, OnInit, HostBinding} from '@angular/core';
import {IRepo} from "../../interfaces/repo";
import {TimelineTitleService} from "./timeline-title.service";
import {TimelineSettingsService} from "./timeline-settings.service";

@Component({
    selector: 'jna-timeline-repo',
    templateUrl: './timeline-repo.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineRepoComponent implements OnInit {
    @HostBinding("class.is-hidden") isHidden:boolean = false;

    @Input("repo") repo:IRepo;
    @Input("isEven") isEven:boolean;

    public title:string;

    constructor(private titleService:TimelineTitleService, private settingsService:TimelineSettingsService) {
        this.settingsService.subscribe((settings:any) => {
            this.isHidden = !settings.githubRepos;
        });
    }

    getIconClass() {
        return {
            "jna-icon-github": !this.isEven,
            "jna-icon-reverse-github": this.isEven
        };
    }

    ngOnInit() {
        this.titleService.subscribe(this.repo.name, this.isEven, (t:string) => {
            this.title = t;
        });
        this.title = this.repo.name;
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {IRepo} from "../../interfaces/repo";
import {TimelineTitleService} from "./timeline-title.service";

@Component({
    selector: 'jna-timeline-repo',
    templateUrl: './timeline-repo.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineRepoComponent implements OnInit {
    @Input("repo") repo:IRepo;
    @Input("isEven") isEven:boolean;

    public title:string;

    constructor(private titleService:TimelineTitleService) {}

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

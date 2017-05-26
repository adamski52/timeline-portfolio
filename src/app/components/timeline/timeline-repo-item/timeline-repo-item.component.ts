import {Component, Input, OnInit} from '@angular/core';
import {IRepo} from "../../../interfaces/repo";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";

@Component({
    selector: 'jna-timeline-repo',
    templateUrl: './timeline-repo-item.component.html',
    providers: [
        TimelineTitleService
    ]
})
export class TimelineRepoComponent implements OnInit {
    @Input("item")
    public item:IRepo;

    public title:string;

    constructor(private titleService:TimelineTitleService) {}

    ngOnInit() {
        this.title = (<IRepo>this.item).name;
        this.titleService.subscribe(this.title, this.item.$$isEven, (t:string) => {
            this.title = t;
        });
    }
}

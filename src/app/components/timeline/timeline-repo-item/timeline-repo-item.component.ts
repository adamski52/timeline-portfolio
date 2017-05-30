import {Component, Input, OnInit} from '@angular/core';
import {IRepo} from "../../../interfaces/repo";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {AppConfigService} from "../../../services/app-config.service";

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

    constructor(private titleService:TimelineTitleService,
                private appConfigService:AppConfigService) {}

    ngOnInit() {
        this.title = (<IRepo>this.item).name;

        this.appConfigService.subscribe(() => {
            this.titleService.setOrientation(this.item.$$isEven);
        });

        this.titleService.subscribe(this.title, (t: string) => {
            this.title = t;
        });
    }
}

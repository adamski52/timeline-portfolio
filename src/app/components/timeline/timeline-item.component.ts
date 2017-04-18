import {Component, Input, OnInit} from '@angular/core';
import {IRepo} from "../../interfaces/repo";
import {TimelineItemService} from "./timeline-item.service";

@Component({
    selector: 'jna-timeline-item',
    templateUrl: './timeline-item.component.html',
    providers: [
        TimelineItemService
    ]
})
export class TimelineItemComponent implements OnInit {
    @Input("repo") repo:IRepo;
    @Input("isEven") isEven:boolean;

    public title:string;

    constructor(private itemService:TimelineItemService) {}

    ngOnInit() {
        this.itemService.subscribe(this.repo.name, this.isEven, (t:string) => {
            this.title = t;
        });
        this.title = this.repo.name;
    }
}

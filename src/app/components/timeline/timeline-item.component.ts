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

    private title:string;
    private originalTitle:string;

    constructor(private itemService:TimelineItemService) {
        this.itemService.subscribe((t:string) => {
            if(t === "") {
                this.title = this.originalTitle;
            }
            else {
                this.title = t;
            }
        });
    }

    ngOnInit() {
        this.originalTitle = this.repo.name;
        this.title = this.originalTitle;
    }
}

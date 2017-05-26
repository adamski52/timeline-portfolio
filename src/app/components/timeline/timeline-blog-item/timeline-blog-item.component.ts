import {Component, Input, OnInit} from '@angular/core';
import {IBlog} from "../../../interfaces/blog";

@Component({
    selector: 'jna-timeline-blog',
    templateUrl: './timeline-blog-item.component.html'
})
export class TimelineBlogComponent implements OnInit {
    @Input("item")
    public item:IBlog;

    public title:string;
    public summary:string;

    ngOnInit() {
        this.title = (<IBlog>this.item).title;
        this.summary = (<IBlog>this.item).content;
    }
}

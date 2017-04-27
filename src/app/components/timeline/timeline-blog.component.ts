import {Component, Input, OnInit, HostBinding} from '@angular/core';
import {IBlog} from "../../interfaces/blog";
import {TimelineSettingsService} from "./timeline-settings.service";

@Component({
    selector: 'jna-timeline-blog',
    templateUrl: './timeline-blog.component.html'
})
export class TimelineBlogComponent implements OnInit {
    @HostBinding("class.is-hidden") isHidden:boolean = false;

    @Input("blog") blog:IBlog;
    @Input("isEven") isEven:boolean;

    public title:string;
    public summary:string;

    constructor(private settingsService:TimelineSettingsService) {
        this.settingsService.subscribe((settings:any) => {
            this.isHidden = !settings.blogs;
        });
    }

    getIconClass() {
        return {
            "jna-icon-font": !this.isEven,
            "jna-icon-reverse-font": this.isEven
        };
    }

    ngOnInit() {
        this.title = this.blog.title;
        this.summary = this.blog.content;
    }
}

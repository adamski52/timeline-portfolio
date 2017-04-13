import {Component, Input, OnInit} from '@angular/core';
import {IRepo} from "../../interfaces/repo";
import {ILanguage} from "../../interfaces/language";

@Component({
    selector: 'jna-timeline-item',
    templateUrl: './timeline-item.component.html'
})
export class TimelineItemComponent implements OnInit {
    @Input("repo") repo:IRepo;

    private title:string;

    constructor() {}

    onHover(language?:ILanguage) {
        console.log("on hover", language);
        if(language) {
            this.title = language.name;
            return;
        }
        this.title = this.repo.name;
    }

    ngOnInit() {
        this.title = this.repo.name;
    }
}

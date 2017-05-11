import {Component, Input, OnInit} from '@angular/core';
import {TimelineRepoLanguagesService} from "./timeline-repo-languages.service";
import {ILanguage} from "../../../interfaces/language";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";

@Component({
    selector: 'jna-repo-languages',
    templateUrl: './timeline-repo-languages.component.html',
    providers: [
        TimelineRepoLanguagesService
    ]
})
export class TimelineRepoLanguagesComponent implements OnInit {
    @Input("repo") repo:string;

    public languages:ILanguage[];

    constructor(private titleService:TimelineTitleService, private languageService:TimelineRepoLanguagesService) {
        this.languageService.subscribe((languages:ILanguage[]) => {
            this.languages = languages;
        });
    }

    onOut() {
        this.titleService.reset();
    }

    onOver(language:ILanguage) {
        this.titleService.setTitle(this.languageService.getDisplayName(language));
    }

    ngOnInit() {
        if (this.repo) {
            this.languageService.fetch(this.repo);
        }
    }
}

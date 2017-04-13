import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {GithubRepoLanguagesService} from "./repo-languages.service";
import {ILanguage} from "../../interfaces/language";
import {TimelineItemService} from "../timeline/timeline-item.service";

@Component({
    selector: 'jna-repo-languages',
    templateUrl: 'repo-languages.component.html',
    providers: [
        GithubRepoLanguagesService
    ]
})
export class RepoLanguagesComponent implements OnInit {
    @Input("repo") repo:string;

    public languages:ILanguage[];

    constructor(private itemService:TimelineItemService, private languageService:GithubRepoLanguagesService) {
        this.languageService.subscribe((languages:ILanguage[]) => {
            this.languages = languages;
        });
    }

    onOut() {
        this.itemService.title = "";
    }

    onOver(language:ILanguage) {
        this.itemService.title = language.name;
    }

    ngOnInit() {
        if (this.repo) {
            this.languageService.fetch(this.repo);
        }
    }
}

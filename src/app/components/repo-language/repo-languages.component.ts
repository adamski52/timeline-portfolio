import {Component, Input, OnInit} from '@angular/core';
import {GithubRepoLanguagesService} from "./repo-languages.service";
import {ILanguage} from "../../interfaces/language";
import {TimelineTitleService} from "../timeline/timeline-title.service";

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

    constructor(private titleService:TimelineTitleService, private languageService:GithubRepoLanguagesService) {
        this.languageService.subscribe((languages:ILanguage[]) => {
            this.languages = languages;
        });
    }

    onOut() {
        this.titleService.reset();
    }

    onOver(language:ILanguage) {
        this.titleService.setTitle(language.name);
    }

    ngOnInit() {
        if (this.repo) {
            this.languageService.fetch(this.repo);
        }
    }
}

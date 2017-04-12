import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {GithubRepoLanguagesService} from "./repo-languages.service";
import {ILanguage} from "../../interfaces/language";

@Component({
    selector: 'jna-repo-languages',
    templateUrl: 'repo-languages.component.html',
    providers: [
        GithubRepoLanguagesService
    ]
})
export class RepoLanguagesComponent implements OnInit {
    @Input("repo") repo:string;

    @Output("onHover") onHover = new EventEmitter<string>();

    public isHover:boolean = true;
    public languages:ILanguage[];

    constructor(private languageService:GithubRepoLanguagesService) {
        this.languageService.subscribe((languages:ILanguage[]) => {
            this.languages = languages;
        });
    }

    onOut() {
        this.isHover = false;
        this.onHover.emit("");
    }

    onOver(language:ILanguage) {
        this.onHover.emit(language.name);
    }

    ngOnInit() {
        if (this.repo) {
            this.languageService.fetch(this.repo);
        }
    }
}

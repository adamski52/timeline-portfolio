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

    @Output("hover") hover = new EventEmitter<ILanguage>();

    public languages:ILanguage[];

    constructor(private languageService: GithubRepoLanguagesService) {
        this.languageService.subscribe((languages:ILanguage[]) => {
            this.languages = languages;
        });
    }

    onHover() {
        console.log("all wrong");
    }

    onOut() {
        console.log("out");
        this.hover.emit();
    }

    onOver(language:ILanguage) {
        console.log("over", language);
        this.hover.emit(language);
    }

    ngOnInit() {
        if(this.repo) {
            this.languageService.fetch(this.repo);
        }
    }
}

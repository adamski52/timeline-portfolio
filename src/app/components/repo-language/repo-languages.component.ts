import {Component, Input, OnInit} from '@angular/core';
import {GithubGenericService} from '../../services/github-generic.service';
import {IObject} from "../../interfaces/object";
import {GithubRepoLanguagesService} from "../../services/github-repo-languages.service";

@Component({
    selector: 'jna-repo-languages',
    templateUrl: './repo-languages.component.html',
    providers: [
        GithubGenericService
    ]
})
export class RepoLanguagesComponent {
    @Input("repo") repo:string;

    public languages:IObject[];

    constructor(private service: GithubGenericService, private languageService: GithubRepoLanguagesService) {
        this.service.data$.subscribe((response) => {
            this.languages = this.languageService.makeArray(response);
        });
    }

    ngOnInit() {
        if(this.repo) {
            this.service.fetch("/api/repos/adamski52/" + this.repo + "/languages");
        }
    }
}

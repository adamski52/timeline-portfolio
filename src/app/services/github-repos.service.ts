import {Injectable} from '@angular/core';
import {GithubGenericService} from "./github-generic.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "./error.service";
import {IRepo} from "../interfaces/interfaces";
import {GithubRepoLanguagesService} from "./github-repo-languages.service";

@Injectable()
export class GithubReposService extends GithubGenericService {
    private _data:IRepo[];

    constructor(private languageService:GithubRepoLanguagesService,
                protected http: Http,
                protected errorService: ErrorService) {
        super(http, errorService);
    }

    public fetch(): void {
        this.http.get("/api/users/adamski52/repos").subscribe((response: Response) => {
            this.data = response.json();

            for(let repo of this.data) {
                this.languageService.fetch(repo);
            }

            this.broadcast(this.data);
        },
        (error: Response) => {
            this.errorService.add("Failed to load repos.", error.status);
        });
    }

    public get data():IRepo[] {
        return this._data;
    }

    public set data(repos:IRepo[]) {
        this._data = repos;
    }
}

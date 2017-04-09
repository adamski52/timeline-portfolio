import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../services/error.service";
import {IRepo} from "../../interfaces/repo";

@Injectable()
export class GithubReposService extends GenericHttpService {
    private _data:IRepo[];

    constructor(protected http: Http,
                protected errorService: ErrorService) {
        super(http, errorService);
    }

    public fetch(): void {
        this.http.get("/api/users/adamski52/repos").subscribe((response: Response) => {
            this.data = response.json();
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

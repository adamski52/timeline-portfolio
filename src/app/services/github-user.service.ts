import {Injectable} from '@angular/core';
import {GithubGenericService} from "./github-generic.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "./error.service";
import {IUser} from "../interfaces/interfaces";

@Injectable()
export class GithubUserService extends GithubGenericService {
    private _data:IUser;

    constructor(protected http: Http, protected errorService: ErrorService) {
        super(http, errorService);
    }

    public fetch(): void {
        this.http.get("/api/users/adamski52").subscribe((response: Response) => {
            this.data = response.json();
            this.broadcast(this.data);
        },
        (error: Response) => {
            this.errorService.add("Failed to load profile.", error.status);
        });
    }

    public get data():IUser {
        return this._data;
    }

    public set data(user:IUser) {
        this._data = user;
    }
}

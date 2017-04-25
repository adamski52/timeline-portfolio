import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../services/error.service";
import {IUser} from "../../interfaces/user";

@Injectable()
export class GithubUserService extends GenericHttpService {
    private _data:IUser;

    constructor(protected http:Http, protected errorService:ErrorService) {
        super(http, errorService);
    }

    public fetch():void {
        this.load("/api/users/adamski52").subscribe((response:Response) => {
            this.data = response.json();
            this.subject.next(this.data);
        }, (error:Response) => {
            this.errorService.add("Failed to load user.", error.status);
        });
    }

    public get data():IUser {
        return this._data;
    }

    public set data(user:IUser) {
        this._data = user;
    }
}

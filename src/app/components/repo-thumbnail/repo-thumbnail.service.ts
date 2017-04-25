import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../services/error.service";
import {IThumbnail} from "../../interfaces/thumbnail";

@Injectable()
export class GithubRepoThumbnailService extends GenericHttpService {

    private _data:IThumbnail;

    constructor(protected http:Http, protected errorService:ErrorService) {
        super(http, errorService);
    }

    public fetch(repoName:string):void {
        this.load("/api/repos/adamski52/" + repoName + "/contents/thumbnail.png").subscribe((response:Response) => {
            this.data = response.json();
            this.subject.next(this.data);
        }, (error:Response) => {
            this.errorService.add("Failed to load thumbnail.", error.status);
        });
    }

    public get data():IThumbnail {
        return this._data;
    }

    public set data(thumbnail:IThumbnail) {
        this._data = thumbnail;
    }
}

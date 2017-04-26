import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../services/error.service";
import {IBlog} from "../../interfaces/blog";

@Injectable()
export class TimelineBlogService extends GenericHttpService {
    private _data:IBlog[];

    constructor(protected http: Http,
                protected errorService: ErrorService) {
        super(http, errorService);
    }

    public fetch(): void {
        this.load("/blog/blogger/v3/blogs/3369191738147730436/posts?key=AIzaSyD53h3c6rF1MQ1Bt9Nvdv0tDNbuB7aC1R4").subscribe((response: Response) => {
            this.data = response.json().items;
            this.subject.next(this.data);
        }, (error:Response) => {
            this.errorService.add("Failed to load blogs.", error.status);
        });
    }

    public get data():IBlog[] {
        return this._data;
    }

    public set data(repos:IBlog[]) {
        this._data = repos;
    }
}

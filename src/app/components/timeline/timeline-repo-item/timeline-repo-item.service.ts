import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../../services/error.service";
import {IRepo} from "../../../interfaces/repo";

@Injectable()
export class TimelineRepoService extends GenericHttpService {
    private _data:IRepo[] = [];

    constructor(protected http: Http,
                protected errorService: ErrorService) {
        super(http, errorService);
    }

    public fetch(): void {
        this.load("/api/users/adamski52/repos").subscribe((response: Response) => {
            this._data = response.json();
            this.subject.next(this._data);
        }, (error:Response) => {
            this.errorService.add("Failed to load repos.", error.status);
        });
    }
}

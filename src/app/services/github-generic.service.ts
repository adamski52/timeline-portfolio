import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, Observer} from 'rxjs';
import {ErrorService} from "./error.service";
import {IObject} from "../interfaces/object";

@Injectable()
export class GithubGenericService {
    protected _observer: Observer<any>;

    constructor(protected http: Http, protected errorService: ErrorService) {}

    public data$: Observable<any> = new Observable((observer) => {
        this._observer = observer
    }).share();

    protected broadcast(response:any) {
        this._observer.next(response);
    }

    public fetch(url): void {
        this.http.get(url).subscribe((response:Response) => {
            this.broadcast(response.json());
        },
        (error: Response) => {
            this.errorService.add("Failed to load language.", error.status);
        });
    }
}

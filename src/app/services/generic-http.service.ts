import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, Observer, Subscription} from 'rxjs';
import {ErrorService} from "./error.service";

@Injectable()
export class GenericHttpService {
    protected _observer: Observer<any>;

    constructor(protected http: Http, protected errorService: ErrorService) {}

    private data$: Observable<any> = new Observable((observer) => {
        this._observer = observer;
    }).share();

    protected broadcast(response:any) {
        if(this._observer) {
            this._observer.next(response);
        }
    }

    public subscribe(handler:(value: any) => void):Subscription {
        return this.data$.subscribe(handler);
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

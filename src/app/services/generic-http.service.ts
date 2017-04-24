import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, Observer, Subscription} from 'rxjs';
import {ErrorService} from "./error.service";

@Injectable()
export abstract class GenericHttpService {
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

    public fetch(url:string):void {
        this.load(url).subscribe((response:any) => {
           this.broadcast(response.json());
        });
    }

    protected load(url:string): Observable<Response> {
        return this.http.get(url);
    }

    public subscribe(handler:(value: any) => void):Subscription {
        return this.data$.subscribe(handler);
    }

    public isMock():boolean {
        return true;
    }
}

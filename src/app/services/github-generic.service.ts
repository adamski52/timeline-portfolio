import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable, Observer} from 'rxjs';

@Injectable()
export class GithubGenericService {
    protected _observer: Observer<any>;
    public data$: Observable<Response> = new Observable((observer) => {
        this._observer = observer
    }).share();

    protected broadcast(response:Response) {
        if(this._observer) {
            this._observer.next(response.json());
        }
    }
}

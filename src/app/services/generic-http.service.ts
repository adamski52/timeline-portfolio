import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ErrorService} from "./error.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export abstract class GenericHttpService {
    protected subject:BehaviorSubject<any> = new BehaviorSubject([]);

    constructor(protected http: Http, protected errorService: ErrorService) {}

    public fetch(url:string):void {
        this.load(url).subscribe((response:any) => {
           this.subject.next(response.json());
        });
    }

    protected load(url:string): Observable<Response> {
        return this.http.get(url);
    }

    public subscribe(handler:(value: any) => void):Subscription {
        return this.subject.subscribe(handler);
    }
}

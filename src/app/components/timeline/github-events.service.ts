import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../services/error.service";
import {IEvent} from "../../interfaces/event";

@Injectable()
export class GithubEventsService extends GenericHttpService {
    private _data:IEvent[];

    constructor(protected http:Http, protected errorService:ErrorService) {
        super(http, errorService);
    }

    public fetch():void {
        this.load("/api/users/adamski52/events").subscribe((response:Response) => {
            this.data = response.json();
            this.broadcast(this.data);
        }, (error:Response) => {
            this.errorService.add("Failed to load events.", error.status);
        });
    }

    public get data():IEvent[] {
        return this._data;
    }

    public set data(events:IEvent[]) {
        this._data = events;
    }
}

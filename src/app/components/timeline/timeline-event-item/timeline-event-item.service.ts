import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../../services/error.service";
import {IEvent} from "../../../interfaces/event";

@Injectable()
export class TimelineEventService extends GenericHttpService {
    private _data:IEvent[];

    constructor(protected http:Http, protected errorService:ErrorService) {
        super(http, errorService);
    }

    private sanitizeEventMessages(data:IEvent[]):IEvent[] {
        for(let d in data) {
            if(data[d].payload && data[d].payload.ref) {
                data[d].payload.ref = data[d].payload.ref.replace("refs/heads/", "");
            }
        }

        return data;
    }

    public getEventMessage(event:IEvent):string {
        if(event.type === "CreateEvent") {
            return "created " + event.payload.ref;
        }

        return "pushed to " + event.payload.ref;
    }

    public getCommitMessage(event:IEvent):string {
        if(event.type === "CreateEvent") {
            return "created branch";
        }

        return event.payload.commits[0].message
    }

    public fetch():void {
        this.load("/api/users/adamski52/events").subscribe((response:Response) => {
            this._data = this.sanitizeEventMessages(response.json());

            this.subject.next(this._data);
        }, (error:Response) => {
            this.errorService.add("Failed to load events.", error.status);
        });
    }
}

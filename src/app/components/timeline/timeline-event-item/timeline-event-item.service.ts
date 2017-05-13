import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../../services/error.service";
import {IEvent} from "../../../interfaces/event";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class TimelineEventService extends GenericHttpService {
    private _commits:IEvent[];
    private _branches:IEvent[];

    protected subject:BehaviorSubject<any> = new BehaviorSubject({
        commits: [],
        branches: []
    });

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

    public isCreateEvent(event:IEvent):boolean {
        return event.type === "CreateEvent";
    }

    public fetch():void {
        this.load("/api/users/adamski52/events").subscribe((response:Response) => {
            let data = this.sanitizeEventMessages(response.json());

            this._commits = [];
            this._branches = [];

            for(let d of data) {
                if(this.isCreateEvent(d)) {
                    d.$$type = "branches";
                    this._branches.push(d);
                }
                else {
                    d.$$type = "commits";
                    this._commits.push(d);
                }
            }

            this.subject.next({
                commits: this._commits,
                branches: this._branches
            });
        }, (error:Response) => {
            this.errorService.add("Failed to load events.", error.status);
        });
    }
}

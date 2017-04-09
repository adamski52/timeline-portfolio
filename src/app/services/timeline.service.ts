import {Injectable} from '@angular/core';
import {GithubGenericService} from "./github-generic.service";
import {Http} from "@angular/http";
import {ErrorService} from "./error.service";
import {GithubUserService} from "./github-user.service";
import {GithubReposService} from "./github-repos.service";
import {GithubEventsService} from "./github-events.service";
import {ITimeline, IUser, IRepo, IEvent} from "../interfaces/interfaces";

@Injectable()
export class TimelineService extends GithubGenericService {
    private _data:ITimeline;

    constructor(private userService:GithubUserService,
                private reposService:GithubReposService,
                private eventsService:GithubEventsService,
                protected http: Http,
                protected errorService: ErrorService) {
        super(http, errorService);

        this.userService.subscribe((user:IUser) => {
            this._data.user = user;
        });

        this.reposService.subscribe((repos:IRepo[]) => {
            this._data.repos = repos;
        });

        this.eventsService.subscribe((events:IEvent[]) => {
            this._data.events = events;
        });
    }

    public fetch(): void {
        this.userService.fetch();
        this.reposService.fetch();
        this.eventsService.fetch();
    }
}

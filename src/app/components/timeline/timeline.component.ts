import {Component} from '@angular/core';
import {GithubUserService} from "./github-user.service";
import {GithubReposService} from "./github-repos.service";
import {GithubEventsService} from "./github-events.service";
import {IUser} from "../../interfaces/user";
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent {

    public user:IUser;
    public repos:IRepo[];
    public events:IEvent[];

    constructor(private userService:GithubUserService,
                private reposService:GithubReposService,
                private eventsService:GithubEventsService) {

        this.userService.subscribe((user:IUser) => {
            this.user = user;
        });

        this.reposService.subscribe((repos:IRepo[]) => {
            this.repos = repos;
        });

        this.eventsService.subscribe((events:IEvent[]) => {
            console.log(events);
            this.events = events;
        });

        this.userService.fetch();
        this.reposService.fetch();
        this.eventsService.fetch();
    }
}

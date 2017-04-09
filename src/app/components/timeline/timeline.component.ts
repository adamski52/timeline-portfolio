import {Component} from '@angular/core';
import {IUser, IRepo, IEvent} from "../../interfaces/interfaces";
import {GithubUserService} from "../../services/github-user.service";
import {GithubReposService} from "../../services/github-repos.service";
import {GithubEventsService} from "../../services/github-events.service";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html',
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
            this.events = events;
        });

        this.userService.fetch();
        this.reposService.fetch();
        this.eventsService.fetch();
    }
}

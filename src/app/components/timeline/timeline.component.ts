import {Component} from '@angular/core';
import {GithubUserService} from "../../services/github-user.service";
import {GithubReposService} from "../../services/github-repos.service";
import {GithubEventsService} from "../../services/github-events.service";
import {IObject} from "../../interfaces/object";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent {

    public user:IObject;
    public repos:IObject[];
    public events:IObject[];

    constructor(private userService: GithubUserService,
                private reposService: GithubReposService,
                private eventsService: GithubEventsService) {
        userService.data$.subscribe((response) => {
            console.log("USER", response);
            this.user = response;
        });

        reposService.data$.subscribe((response) => {
            console.log("REPOS", response);
            this.repos = response;
        });

        eventsService.data$.subscribe((response) => {
            console.log("EVENTS", response);
            this.events = response;
        });

        userService.fetch();
        reposService.fetch();
        eventsService.fetch();
    }
}

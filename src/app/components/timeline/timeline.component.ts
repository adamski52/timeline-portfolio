import {Component} from '@angular/core';
import {GithubUserService} from "../../services/github-user.service";
import {GithubReposService} from "../../services/github-repos.service";
import {GithubEventsService} from "../../services/github-events.service";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

    public user: any;
    public repos: any;
    public events: any;

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

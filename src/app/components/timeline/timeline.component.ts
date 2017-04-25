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

    public repos:IRepo[] = [];
    public events:IEvent[] = [];
    public items:(IRepo|IEvent)[] = [];

    constructor(private reposService:GithubReposService,
                private eventsService:GithubEventsService) {

        this.reposService.subscribe((repos:IRepo[]) => {
            this.repos = repos;
            this.createItems();
        });

        this.eventsService.subscribe((events:IEvent[]) => {
            this.events = events;
            this.createItems();
        });

        this.reposService.fetch();
        this.eventsService.fetch();
    }

    private createItems():void {
        this.items = this.repos;
        console.log(this.items);
    }

    public isItemRepo(item:IRepo|IEvent):boolean {
        let match:IRepo = this.repos.find((repo:IRepo) => {
            return repo.id === item.id;
        });

        return match === undefined;
    }

    public isItemEvent(item:IRepo|IEvent):boolean {
        let match:IEvent = this.events.find((event:IEvent) => {
            return event.id === item.id;
        });

        return match === undefined;
    }
}

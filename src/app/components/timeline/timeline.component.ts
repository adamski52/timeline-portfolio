import {Component} from '@angular/core';
import {GithubReposService} from "./github-repos.service";
import {GithubEventsService} from "./github-events.service";
import {IUser} from "../../interfaces/user";
import {IRepo} from "../../interfaces/repo";
import {IEvent} from "../../interfaces/event";
import {IBlog} from "../../interfaces/blog";
import {TimelineBlogService} from "./timeline-blog.service";
import {TimelineSettingsService} from "./timeline-settings.service";

@Component({
    selector: 'jna-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent {

    private _repos:IRepo[] = [];
    private _events:IEvent[] = [];
    private _blogs:IBlog[] = [];
    private _settings = {};

    public items:(IRepo|IEvent|IBlog)[] = [];

    constructor(private reposService:GithubReposService,
                private eventsService:GithubEventsService,
                private blogsService:TimelineBlogService,
                private settingsService:TimelineSettingsService) {

        this.reposService.subscribe((repos:IRepo[]) => {
            this.repos = repos;
        });

        this.eventsService.subscribe((events:IEvent[]) => {
            this.events = events;
        });

        this.blogsService.subscribe((blogs:IBlog[]) => {
            this.blogs = blogs;
        });

        this.settingsService.subscribe((settings:any) => {
            this._settings = settings;
            setTimeout(() => {
                this.items = this.createItems();
           }, 801)
        });

        this.reposService.fetch();
        this.eventsService.fetch();
        this.blogsService.fetch();
    }

    private createItems():(IBlog|IEvent|IRepo)[] {
        let items = [];

        if(this._settings.githubRepos) {
            items = items.concat(this.repos);
        }

        if(this._settings.githubEvents) {
            items = items.concat(this.events);
        }

        if(this._settings.blogs) {
            items = items.concat(this.blogs);
        }

        return items;
    }

    public isItemRepo(item:IRepo|IEvent|IBlog):boolean {
        let match:IRepo = this.repos.find((repo:IRepo) => {
            return repo.id === item.id;
        });

        return match !== undefined;
    }

    public isItemEvent(item:IRepo|IEvent|IBlog):boolean {
        let match:IEvent = this.events.find((event:IEvent) => {
            return event.id === item.id;
        });

        return match !== undefined;
    }

    public isItemBlog(item:IRepo|IEvent|IBlog):boolean {
        let match:IBlog = this.blogs.find((blog:IBlog) => {
            return blog.id === item.id;
        });

        return match !== undefined;
    }

    public set repos(repos:IRepo[]) {
        this._repos = repos;
        this.items = this.createItems();
    }

    public get repos():IRepo[] {
        return this._repos;
    }

    public set events(events:IEvent[]) {
        this._events = events;
        this.items = this.createItems();
    }

    public get events():IEvent[] {
        return this._events;
    }

    public set blogs(blogs:IBlog[]) {
        this._blogs= blogs;
        this.items = this.createItems();
    }

    public get blogs():IBlog[] {
        return this._blogs;
    }
}

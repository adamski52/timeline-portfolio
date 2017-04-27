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

    public repos:IRepo[] = [];
    public events:IEvent[] = [];
    public blogs:IBlog[] = [];

    public items:(IRepo|IEvent|IBlog)[] = [];

    constructor(private reposService:GithubReposService,
                private eventsService:GithubEventsService,
                private blogsService:TimelineBlogService,
                private settingsService:TimelineSettingsService) {

        this.reposService.subscribe((repos:IRepo[]) => {
            this.repos = repos;
            this.createItems();
        });

        this.eventsService.subscribe((events:IEvent[]) => {
            this.events = events;
            this.createItems();
        });

        this.blogsService.subscribe((blogs:IBlog[]) => {
            this.blogs = blogs;
            this.createItems();
        });

        this.settingsService.subscribe((settings:any) => {
           setTimeout(() => {
               let items = [];

               if(settings.githubRepos) {
                   items = items.concat(this.repos);
               }

               if(settings.githubEvents) {
                   items = items.concat(this.events);
               }

               if(settings.blogs) {
                   items = items.concat(this.blogs);
               }

               this.items = items;
           }, 801)
        });

        this.reposService.fetch();
        this.eventsService.fetch();
        this.blogsService.fetch();
    }

    private createItems():void {
        this.items = [].concat(this.repos, this.events, this.blogs);
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
}

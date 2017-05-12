import {Injectable} from '@angular/core';
import {IBlog} from "../../interfaces/blog";
import {IEvent} from "../../interfaces/event";
import {IRepo} from "../../interfaces/repo";
import {TimelineSettingsService} from "./timeline-settings/timeline-settings.service";
import {ISettings} from "../../interfaces/settings";
import {TimelineRepoService} from "./timeline-repo-item/timeline-repo-item.service";
import {TimelineEventService} from "./timeline-event-item/timeline-event-item.service";
import {TimelineBlogService} from "./timeline-blog-item/timeline-blog-item.service";
import {Subscription} from "rxjs/Subscription";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IEventCollection} from "../../interfaces/event-collection";

@Injectable()
export class TimelineService {
    private settings:ISettings;
    private repos:IRepo[] = [];
    private branches:IEvent[] = [];
    private commits:IEvent[] = [];
    private events:IEvent[] = [];
    private blogs:IBlog[] = [];
    private subject:BehaviorSubject<any> = new BehaviorSubject([]);

    constructor(private reposService:TimelineRepoService,
                private eventsService:TimelineEventService,
                private blogsService:TimelineBlogService,
                private settingsService:TimelineSettingsService) {

        this.reposService.subscribe((repos: IRepo[]) => {
            this.repos = repos;
            this.updateItems();
        });

        this.eventsService.subscribe((events: IEventCollection) => {
            this.commits = events.commits;
            this.branches = events.branches;

            this.events = [].concat(this.commits, this.branches);
            console.log("E", this.events);

            this.updateItems();
        });

        this.blogsService.subscribe((blogs: IBlog[]) => {
            this.blogs = blogs;
            this.updateItems();
        });

        this.settingsService.subscribe((settings: any) => {
            this.settings = settings;
            //setTimeout(() => {
            //    this.updateItems();
            //}, 301);
        });
    }

    public fetch():void {
        this.reposService.fetch();
        this.eventsService.fetch();
        this.blogsService.fetch();
    }

    public subscribe(handler:(value: any) => void):Subscription {
        return this.subject.subscribe(handler);
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

    public getItemTime(item:IBlog|IEvent|IRepo):number {
        if(this.isItemRepo(item)) {
            return new Date((<IRepo>item).updated_at.toString()).getTime();
        }

        if(this.isItemBlog(item)) {
            return new Date((<IBlog>item).published).getTime();
        }

        if(this.isItemEvent(item)) {
            return new Date((<IEvent>item).created_at.toString()).getTime();
        }

        return 0;
    }

    public updateItems():void {
        let items = [];
        if(!this.settings) {
            this.subject.next(items);
            return;
        }

        if(this.settings.repos) {
            items = items.concat(this.repos);
        }

        if(this.settings.commits) {
            items = items.concat(this.commits);
        }

        if(this.settings.branches) {
            items = items.concat(this.branches);
        }

        if(this.settings.blogs) {
            items = items.concat(this.blogs);
        }

        items = items.sort((lhs:IBlog|IEvent|IRepo, rhs:IBlog|IEvent|IRepo) => {
            let lhsValue:number = this.getItemTime(lhs),
                rhsValue:number = this.getItemTime(rhs);

            return rhsValue - lhsValue;
        });

        console.log("ITEMS", items);
        this.subject.next(items);
    }
}

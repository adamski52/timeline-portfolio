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
import {AppConfigService} from "../../services/app-config.service";
import {IAppConfig} from "../../interfaces/app-config";

@Injectable()
export class TimelineService {
    private settings:ISettings;
    private repos:IRepo[] = [];
    private branches:IEvent[] = [];
    private commits:IEvent[] = [];
    private blogs:IBlog[] = [];
    private config:IAppConfig;

    protected subject:BehaviorSubject<any> = new BehaviorSubject([]);

    constructor(private reposService:TimelineRepoService,
                private eventsService:TimelineEventService,
                private blogsService:TimelineBlogService,
                private settingsService:TimelineSettingsService,
                private appConfigService:AppConfigService) {

        this.reposService.subscribe((repos: IRepo[]) => {
            this.repos = repos;
            this.updateItems();
        });

        this.eventsService.subscribe((events: IEventCollection) => {
            this.commits = events.commits;
            this.branches = events.branches;

            this.updateItems();
        });

        this.blogsService.subscribe((blogs: IBlog[]) => {
            this.blogs = blogs;
            this.updateItems();
        });

        this.settingsService.subscribe((settings: ISettings) => {
            this.settings = settings;
            this.updateItems();
        });

        this.appConfigService.subscribe((appConfig:IAppConfig) => {
            this.config = appConfig;
            this.updateItems();
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
        return item.$$type === "repos";
    }

    public isItemCommit(item:IRepo|IEvent|IBlog):boolean {
        return item.$$type === "commits";
    }

    public isItemBranch(item:IRepo|IEvent|IBlog):boolean {
        return item.$$type === "branches";
    }

    public isItemBlog(item:IRepo|IEvent|IBlog):boolean {
        return item.$$type === "blogs";
    }

    public getItemTime(item:IBlog|IEvent|IRepo):number {
        if(this.isItemRepo(item)) {
            return new Date((<IRepo>item).updated_at.toString()).getTime();
        }

        if(this.isItemBlog(item)) {
            return new Date((<IBlog>item).published).getTime();
        }

        if(this.isItemCommit(item) || this.isItemBranch(item)) {
            return new Date((<IEvent>item).created_at.toString()).getTime();
        }

        return 0;
    }

    public updateItems():void {
        let items:(IRepo|IBlog|IEvent)[] = [];

        if(!this.settings) {
            this.subject.next(items);
            return;
        }

        this.repos.map((item:IRepo) => {
           item.$$isHidden = !this.settings.repos;
        });

        this.commits.map((item:IEvent) => {
            item.$$isHidden = !this.settings.commits;
        });

        this.branches.map((item:IEvent) => {
            item.$$isHidden = !this.settings.branches;
        });

        this.blogs.map((item:IBlog) => {
            item.$$isHidden = !this.settings.blogs;
        });

        items = items.concat(this.repos, this.commits, this.branches, this.blogs);
        items = items.sort((lhs:IBlog|IEvent|IRepo, rhs:IBlog|IEvent|IRepo) => {
            let lhsValue:number = this.getItemTime(lhs),
                rhsValue:number = this.getItemTime(rhs);

            return rhsValue - lhsValue;
        });

        let isEven:boolean = true;
        items.map((item:IRepo|IBlog|IEvent) => {
            if(this.config.isMobile) {
                item.$$isEven = true;
                return;
            }

            if(!item.$$isHidden) {
                item.$$isEven = isEven;
                isEven = !isEven;
            }
        });

        this.subject.next(items);
    }
}

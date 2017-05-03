// import {TestBed, inject} from '@angular/core/testing';
// import {IBlog} from "../../interfaces/blog";
// import {IRepo} from "../../interfaces/repo";
// import {IEvent} from "../../interfaces/event";
// import {TimelineBlogService} from "./timeline-blog-item/timeline-blog-item.service";
// import {TimelineRepoService} from "./timeline-repo-item/timeline-repo-item.service";
// import {TimelineEventService} from "./timeline-event-item/timeline-event-item.service";
// import {MockBackend} from '@angular/http/testing';
// import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
// import {ErrorService} from "../../services/error.service";
// import {TimelineService} from "./timeline.service";
//
// describe('TimelineService', () => {
//     let blogResponse = require("../../../../mocks/posts.json"),
//         blogMock:IBlog[] = blogResponse.items,
//         repoMock:IRepo[] = require("../../../../mocks/repos.json"),
//         eventMock:IEvent[] = require("../../../../mocks/events.json");
//
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 ErrorService,
//                 TimelineRepoService,
//                 TimelineBlogService,
//                 TimelineEventService,
//                 {
//                     provide: XHRBackend,
//                     useClass: MockBackend
//                 }
//             ],
//             imports: [
//                 HttpModule
//             ]
//         });
//     });
//
//
//     it('should invoke the repos service', inject([TimelineService, TimelineRepoService], (timelineService:TimelineService, reposService: TimelineRepoService) => {
//         spyOn(reposService, "fetch");
//
//         timelineService.fetch();
//
//         expect(reposService.fetch).toHaveBeenCalled();
//     }));
//
//     it('should invoke the events service', inject([TimelineService, TimelineEventService], (timelineService:TimelineService, eventsService: TimelineEventService) => {
//         spyOn(eventsService, "fetch");
//
//         timelineService.fetch();
//
//         expect(eventsService.fetch).toHaveBeenCalled();
//     }));
//
//     it('should invoke the blogs service', inject([TimelineService, TimelineBlogService], (timelineService:TimelineService, blogsService: TimelineBlogService) => {
//         spyOn(blogsService, "fetch");
//
//         timelineService.fetch();
//
//         expect(blogsService.fetch).toHaveBeenCalled();
//     }));
//
//     it('should respond to the blogs service', inject([XHRBackend, TimelineService, TimelineBlogService, TimelineEventService, TimelineRepoService], (mockBackend:MockBackend, timelineService:TimelineService, blogsService: TimelineBlogService) => {
//         let blogs:IBlog[] = [];
//
//         mockBackend.connections.subscribe((connection) => {
//             connection.mockRespond(new Response(new ResponseOptions({
//                 body: repoMock
//             })));
//         });
//
//         timelineService.subscribe((items:(IBlog|IEvent|IRepo)[]) => {
//
//         });
//
//         timelineService.fetch();
//
//         expect(timelineService..repos).toBe(repoMock);
//     }));
//
//
//     it('should respond to the events service', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, XHRBackend], (eventsService: TimelineEventService, reposService: TimelineRepoService, blogService: TimelineBlogService, mockBackend: MockBackend) => {
//         spyOn(reposService, "fetch");
//         spyOn(blogService, "fetch");
//         mockBackend.connections.subscribe((connection) => {
//             connection.mockRespond(new Response(new ResponseOptions({
//                 body: eventMock
//             })));
//         });
//
//         eventsService.subscribe((r: any) => {
//             response = r;
//         });
//
//         fixture = TestBed.createComponent(TimelineComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//         expect(component.events).toBe(eventMock);
//     }));
//
//     it('should respond to the blogs service', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, XHRBackend], (eventsService: TimelineEventService, reposService: TimelineRepoService, blogService: TimelineBlogService, mockBackend: MockBackend) => {
//         spyOn(eventsService, "fetch");
//         spyOn(reposService, "fetch");
//         mockBackend.connections.subscribe((connection) => {
//             connection.mockRespond(new Response(new ResponseOptions({
//                 body: blogResponse
//             })));
//         });
//
//         blogService.subscribe((r: any) => {
//             response = r;
//         });
//
//         fixture = TestBed.createComponent(TimelineComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//         expect(component.blogs).toBe(blogMock);
//     }));
//
//     it('should add repos to items based on timeline-settings', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, TimelineSettingsService], (eventsService: TimelineEventService, reposService: TimelineRepoService, blogService: TimelineBlogService, settingsService: TimelineSettingsService) => {
//         fixture = TestBed.createComponent(TimelineComponent);
//         component = fixture.componentInstance;
//
//         fixture.detectChanges();
//
//         settingsService.toggleSetting("githubEvents");
//         settingsService.toggleSetting("blogs");
//
//         component.blogs = blogMock;
//         component.repos = repoMock;
//         component.events = eventMock;
//
//         fixture.detectChanges();
//
//         expect(component.items.length).toBe(component.repos.length);
//     }));
//
//     it('should add events to items based on timeline-settings', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, TimelineSettingsService], (eventsService: TimelineEventService, reposService: TimelineRepoService, blogService: TimelineBlogService, settingsService: TimelineSettingsService) => {
//         fixture = TestBed.createComponent(TimelineComponent);
//         component = fixture.componentInstance;
//
//         fixture.detectChanges();
//
//         settingsService.toggleSetting("githubRepos");
//         settingsService.toggleSetting("blogs");
//
//         component.blogs = blogMock;
//         component.repos = repoMock;
//         component.events = eventMock;
//
//         fixture.detectChanges();
//
//         expect(component.items.length).toBe(component.events.length);
//     }));
//
//     it('should add blogs to items based on timeline-settings', inject([TimelineEventService, TimelineRepoService, TimelineBlogService, TimelineSettingsService], (eventsService: TimelineEventService, reposService: TimelineRepoService, blogService: TimelineBlogService, settingsService: TimelineSettingsService) => {
//         fixture = TestBed.createComponent(TimelineComponent);
//         component = fixture.componentInstance;
//
//         fixture.detectChanges();
//
//         settingsService.toggleSetting("githubRepos");
//         settingsService.toggleSetting("githubEvents");
//
//         component.blogs = blogMock;
//         component.repos = repoMock;
//         component.events = eventMock;
//
//         fixture.detectChanges();
//
//         expect(component.items.length).toBe(component.blogs.length);
//     }));
// });

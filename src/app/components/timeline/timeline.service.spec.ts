 import {TestBed, inject} from '@angular/core/testing';
 import {IBlog} from "../../interfaces/blog";
 import {IRepo} from "../../interfaces/repo";
 import {IEvent} from "../../interfaces/event";
 import {TimelineBlogService} from "./timeline-blog-item/timeline-blog-item.service";
 import {TimelineRepoService} from "./timeline-repo-item/timeline-repo-item.service";
 import {TimelineEventService} from "./timeline-event-item/timeline-event-item.service";
 import {MockBackend} from '@angular/http/testing';
 import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
 import {ErrorService} from "../../services/error.service";
 import {TimelineService} from "./timeline.service";
 import {TimelineSettingsService} from "./timeline-settings/timeline-settings.service";

 describe('TimelineService', () => {
     let blogResponse = require("../../../../mocks/posts.json"),
         blogMock:IBlog[] = blogResponse.items,
         repoMock:IRepo[] = require("../../../../mocks/repos.json"),
         eventMock:IEvent[] = require("../../../../mocks/events.json");

     beforeEach(() => {
         TestBed.configureTestingModule({
             providers: [
                 ErrorService,
                 TimelineService,
                 TimelineSettingsService,
                 TimelineRepoService,
                 TimelineBlogService,
                 TimelineEventService,
                 {
                     provide: XHRBackend,
                     useClass: MockBackend
                 }
             ],
             imports: [
                 HttpModule
             ]
         });
     });


     it('should invoke the repos service', inject([TimelineService, TimelineRepoService], (timelineService:TimelineService, reposService: TimelineRepoService) => {
         spyOn(reposService, "fetch");

         timelineService.fetch();

         expect(reposService.fetch).toHaveBeenCalled();
     }));

     it('should respond to the repos service', inject([XHRBackend, TimelineEventService, TimelineBlogService, TimelineRepoService, TimelineService], (mockBackend:MockBackend, eventsService:TimelineEventService, blogsService:TimelineBlogService, reposService:TimelineRepoService, timelineService:TimelineService) => {
         spyOn(eventsService, "fetch");
         spyOn(blogsService, "fetch");
         mockBackend.connections.subscribe((connection) => {
             connection.mockRespond(new Response(new ResponseOptions({
                 body: repoMock
             })));
         });

         let matches:(IBlog|IEvent|IRepo)[];
         timelineService.subscribe((items:(IBlog|IEvent|IRepo)[]) => {
             matches = items.filter((item:IRepo|IEvent|IRepo) => {
                 return timelineService.isItemRepo(item);
             });
         });

         timelineService.fetch();

         expect(matches.length).toBe(repoMock.length);
     }));

     it('should invoke the events service', inject([TimelineService, TimelineEventService], (timelineService:TimelineService, eventsService: TimelineEventService) => {
         spyOn(eventsService, "fetch");

         timelineService.fetch();

         expect(eventsService.fetch).toHaveBeenCalled();
     }));

     it('should respond to the events service', inject([XHRBackend, TimelineEventService, TimelineBlogService, TimelineRepoService, TimelineService], (mockBackend:MockBackend, eventsService:TimelineEventService, blogsService:TimelineBlogService, reposService:TimelineRepoService, timelineService:TimelineService) => {
         spyOn(reposService, "fetch");
         spyOn(blogsService, "fetch");
         mockBackend.connections.subscribe((connection) => {
             connection.mockRespond(new Response(new ResponseOptions({
                 body: eventMock
             })));
         });

         let matches:(IBlog|IEvent|IRepo)[];
         timelineService.subscribe((items:(IBlog|IEvent|IRepo)[]) => {
             matches = items.filter((item:IRepo|IEvent|IRepo) => {
                 return timelineService.isItemEvent(item);
             });
         });

         timelineService.fetch();

         expect(matches.length).toBe(eventMock.length);
     }));

     it('should invoke the blogs service', inject([TimelineService, TimelineBlogService], (timelineService:TimelineService, blogsService: TimelineBlogService) => {
         spyOn(blogsService, "fetch");

         timelineService.fetch();

         expect(blogsService.fetch).toHaveBeenCalled();
     }));

     it('should respond to the blogs service', inject([XHRBackend, TimelineEventService, TimelineBlogService, TimelineRepoService, TimelineService], (mockBackend:MockBackend, eventsService:TimelineEventService, blogsService:TimelineBlogService, reposService:TimelineRepoService, timelineService:TimelineService) => {
         spyOn(reposService, "fetch");
         spyOn(eventsService, "fetch");
         mockBackend.connections.subscribe((connection) => {
             connection.mockRespond(new Response(new ResponseOptions({
                 body: blogResponse
             })));
         });

         let matches:(IBlog|IEvent|IRepo)[];
         timelineService.subscribe((items:(IBlog|IEvent|IRepo)[]) => {
             matches = items.filter((item:IRepo|IEvent|IRepo) => {
                 return timelineService.isItemBlog(item);
             });
         });

         timelineService.fetch();

         expect(matches.length).toBe(blogMock.length);
     }));
});

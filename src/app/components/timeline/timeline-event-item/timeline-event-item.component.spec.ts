import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {MockBackend} from '@angular/http/testing';
import {Component, Injectable} from "@angular/core";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {IEvent} from "../../../interfaces/event";
import {TimelineEventComponent} from "./timeline-event-item.component";
import {TimelineEventService} from "./timeline-event-item.service";
import {TickerService} from "../../../services/ticker.service";
import {TimelineRepoService} from "../timeline-repo-item/timeline-repo-item.service";
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {ErrorService} from "../../../services/error.service";
import {IRepo} from "../../../interfaces/repo";
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";

@Injectable()
class MockTimelineEventService {
    public getEventMessage(event:IEvent):string {
        return "hello!";
    }

    public getCommitMessage(event:IEvent):string {
        return "goodbye!";
    }
}

@Injectable()
class MockTickerService {
    public callback;
    public start(ms:number, handler:(value:any) => void) {
        this.callback = handler;
    }

    public tick() {
        this.callback();
    }

    public stop(interval:number) {}
}

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-event [item]="event"></jna-timeline-event>`
})
class TestComponent {
    public event:IEvent[] = require("../../../../../mocks/events.json")[0];
}

describe('TimelineEventComponent', () => {
    let component:TimelineEventComponent,
        fixture:ComponentFixture<TestComponent>,
        repoData:IRepo[] = require("../../../../../mocks/repos.json");

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineEventComponent
            ],
            providers: [
                {
                    provide: TimelineEventService,
                    useClass: MockTimelineEventService
                },
                {
                    provide: TickerService,
                    useClass: MockTickerService
                },
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                TimelineSettingsService,
                TimelineRepoService,
                ErrorService
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
    }));

    it('should set its title message based on the provided @input event', () => {
        fixture.detectChanges();
        expect(component.title).toEqual("hello!");
    });

    it('should set its summary message based on the provided @input blog', () => {
        fixture.detectChanges();

        expect(component.commitMessage).toEqual("goodbye!");
    });

    it('should set its repo name based on the provided @input blog/repos', inject([XHRBackend], (mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoData
            })));
        });

        let repoService:TimelineRepoService = fixture.debugElement.children[0].injector.get(TimelineRepoService);
        repoService.fetch();

        fixture.detectChanges();

        expect(component.repoName).toEqual("timeline-portfolio");
    }));

    it('should subscribe to title changes', inject([XHRBackend], (mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoData
            })));
        });

        let repoService:TimelineRepoService = fixture.debugElement.children[0].injector.get(TimelineRepoService);
        repoService.fetch();

        let titleService:TimelineTitleService = fixture.debugElement.children[0].injector.get(TimelineTitleService);
        spyOn(titleService, "subscribe");

        fixture.detectChanges();

        expect(titleService.subscribe).toHaveBeenCalled();
    }));

    it('should respond to title changes', inject([XHRBackend], (mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoData
            })));
        });

        let repoService:TimelineRepoService = fixture.debugElement.children[0].injector.get(TimelineRepoService);
        repoService.fetch();

        fixture.detectChanges();

        let mockTicker:MockTickerService = fixture.debugElement.children[0].injector.get(TickerService),
            titleService:TimelineTitleService = fixture.debugElement.children[0].injector.get(TimelineTitleService);

        titleService.setTitle("a");
        mockTicker.tick();
        mockTicker.tick();

        fixture.detectChanges();

        expect(component.repoName).toEqual("a");
    }));
});

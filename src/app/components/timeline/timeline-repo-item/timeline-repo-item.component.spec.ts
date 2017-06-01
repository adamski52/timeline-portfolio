import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineRepoComponent} from './timeline-repo-item.component';
import {TimelineTitleService} from "../timeline-item-title/timeline-item-title.service";
import {Component, Injectable} from "@angular/core";
import {TimelineRepoLanguagesComponent} from "../timeline-repo-languages/timeline-repo-languages.component";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ErrorService} from "../../../services/error.service";
import {TickerService} from "../../../services/ticker.service";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {IRepo} from "../../../interfaces/repo";
import {TimelineRepoService} from "./timeline-repo-item.service";

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
    template: `<jna-timeline-repo [item]="repo"></jna-timeline-repo>`,
    providers: [
        TimelineTitleService
    ]
})
class TestComponent {
    public repo:IRepo = require("../../../../../mocks/repos.json")[0];
}

describe('TimelineRepoComponent', () => {
    let component:TimelineRepoComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineRepoLanguagesComponent,
                TimelineRepoComponent
            ],
            providers: [
                TimelineTitleService,
                TimelineSettingsService,
                TimelineRepoService,
                ErrorService,
                {
                    provide: TickerService,
                    useClass: MockTickerService
                },
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        });

        TestBed.compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
    }));

    it('should set its title based on the provided @input repo', () => {
        fixture.detectChanges();
        expect(component.title).toEqual("angular");
    });

    it('should subscribe to title changes', () => {
        let titleService:TimelineTitleService = fixture.debugElement.children[0].injector.get(TimelineTitleService);
        spyOn(titleService, "subscribe");

        fixture.detectChanges();

        expect(titleService.subscribe).toHaveBeenCalled();
    });

    it('should respond to title changes', () => {
        fixture.detectChanges();

        let mockTicker:MockTickerService = fixture.debugElement.children[0].injector.get(TickerService),
            titleService:TimelineTitleService = fixture.debugElement.children[0].injector.get(TimelineTitleService);

        titleService.setTitle("a");
        mockTicker.tick();
        mockTicker.tick();

        fixture.detectChanges();

        expect(component.title).toEqual("a");
    });
});

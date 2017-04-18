import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineItemComponent} from './timeline-item.component';
import {TimelineItemService} from "./timeline-item.service";
import {Component, Injectable} from "@angular/core";
import {RepoLanguagesComponent} from "../repo-language/repo-languages.component";
import {RepoThumbnailComponent} from "../repo-thumbnail/repo-thumbnail.component";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ErrorService} from "../../services/error.service";
import {IRepo} from "../../interfaces/repo";
import {TickerService} from "../../services/ticker.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-item [repo]="repo"></jna-timeline-item>`,
    providers: [
        TimelineItemService
    ]
})
class TestComponent {
    public repo = {
        "name": "lol"
    };
}

describe('TimelineItemComponent', () => {
    let component:TimelineItemComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                RepoLanguagesComponent,
                RepoThumbnailComponent,
                TimelineItemComponent
            ],
            providers: [
                TimelineItemService,
                ErrorService,
                TickerService,
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
        fixture.detectChanges();
    }));

    it('should set its title based on the provided @input repo', inject([TimelineItemService], (service:TimelineItemService) => {
        expect(component.title).toEqual("lol");
    }));

});

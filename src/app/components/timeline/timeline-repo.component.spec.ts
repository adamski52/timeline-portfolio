import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {TimelineRepoComponent} from './timeline-repo.component';
import {TimelineTitleService} from "./timeline-title.service";
import {Component} from "@angular/core";
import {RepoLanguagesComponent} from "../repo-language/repo-languages.component";
import {RepoThumbnailComponent} from "../repo-thumbnail/repo-thumbnail.component";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ErrorService} from "../../services/error.service";
import {TickerService} from "../../services/ticker.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-repo [repo]="repo"></jna-timeline-repo>`,
    providers: [
        TimelineTitleService
    ]
})
class TestComponent {
    public repo = {
        "name": "lol"
    };
}

describe('TimelineRepoComponent', () => {
    let component:TimelineRepoComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                RepoLanguagesComponent,
                RepoThumbnailComponent,
                TimelineRepoComponent
            ],
            providers: [
                TimelineTitleService,
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

    it('should set its title based on the provided @input repo', inject([TimelineTitleService], (service:TimelineTitleService) => {
        expect(component.title).toEqual("lol");
    }));

});

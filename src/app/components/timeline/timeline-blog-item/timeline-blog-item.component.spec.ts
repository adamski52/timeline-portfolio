import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Component} from "@angular/core";
import {IBlog} from "../../../interfaces/blog";
import {TimelineBlogComponent} from "./timeline-blog-item.component";
import {TimelineDateComponent} from "../timeline-date/timeline-date.component";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {TimelineDateService} from "../timeline-date/timeline-date.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-blog [item]="blog"></jna-timeline-blog>`
})
class TestComponent {
    public blog:IBlog = Object.assign({}, require("../../../../../mocks/posts.json").items[0], {$$type: "blogs"});
}

describe('TimelineBlogComponent', () => {
    let component:TimelineBlogComponent,
        fixture:ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineBlogComponent,
                TimelineDateComponent
            ],
            providers: [
                TimelineSettingsService,
                TimelineDateService
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should set its title message based on the provided @input blog', () => {
        expect(component.title).toEqual(fixture.componentInstance.blog.title);
    });

    it('should set its summary message based on the provided @input blog', () => {
        expect(component.summary).toEqual(fixture.componentInstance.blog.content);
    });
});

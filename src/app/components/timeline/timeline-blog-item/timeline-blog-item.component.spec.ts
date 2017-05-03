import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Component} from "@angular/core";
import {IBlog} from "../../../interfaces/blog";
import {TimelineBlogComponent} from "./timeline-blog-item.component";
import {TimelineDateComponent} from "../timeline-date/timeline-date.component";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";

@Component({
    selector: 'jna-test-component',
    template: `<jna-timeline-blog [blog]="blog"></jna-timeline-blog>`
})
class TestComponent {
    public blog:IBlog = require("../../../../../mocks/posts.json").items[0];
}


describe('TimlineBlogComponent', () => {
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
                TimelineSettingsService
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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Component} from "@angular/core";
import {TimelineBaseItemComponent} from "./timeline-base-item.component";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {ISettings} from "../../../interfaces/settings";
import {settings} from "cluster";
import {IRepo} from "../../../interfaces/repo";

@Component({
    selector: 'jna-timeline-test-item',
    template: `<jna-timeline-item [isEven]="isEven" [item]="item"></jna-timeline-item>`
})
class TestComponent extends TimelineBaseItemComponent {
    public isEven:boolean = true;

    public item = Object.assign({}, require("../../../../../mocks/posts.json").items[0], {$$type: "blogs"});

    constructor(settingsService:TimelineSettingsService) {
        super(settingsService);
    }
}

describe('TimelineBaseItemComponent', () => {
    let component:TimelineBaseItemComponent,
        fixture:ComponentFixture<TestComponent>,
        settingsService:TimelineSettingsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TimelineBaseItemComponent
            ],
            providers: [
                TimelineSettingsService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        settingsService = fixture.debugElement.children[0].injector.get(TimelineSettingsService);
    }));

    it('should subscribe to the settings service', () => {
        spyOn(settingsService, "subscribe");

        fixture.detectChanges();

        expect(settingsService.subscribe).toHaveBeenCalled();
    });

    it('should be visible by default', () => {
        fixture.detectChanges();

        expect(component.isHidden).toBe(false);
        expect(fixture.nativeElement.classList.contains("is-hidden")).toEqual(false);
    });

    it('should hide based on settings key', () => {
        fixture.detectChanges();
        settingsService.toggleSetting("blogs");
        fixture.detectChanges();

        expect(component.isHidden).toBe(true);
        expect(fixture.nativeElement.classList.contains("is-hidden")).toEqual(true);
    });

    it('should unhide based on settings key', () => {
        fixture.detectChanges();
        settingsService.toggleSetting("blogs");
        fixture.detectChanges();
        settingsService.toggleSetting("blogs");
        fixture.detectChanges();

        expect(component.isHidden).toBe(false);
        expect(fixture.nativeElement.classList.contains("is-hidden")).toEqual(false);
    });
});

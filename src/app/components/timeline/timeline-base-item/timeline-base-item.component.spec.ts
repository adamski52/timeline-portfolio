import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Component} from "@angular/core";
import {TimelineBaseItemComponent} from "./timeline-base-item.component";
import {TimelineSettingsService} from "../timeline-settings/timeline-settings.service";
import {ISettings} from "../../../interfaces/settings";

@Component({
    selector: 'jna-timeline-test-item',
    template: `<jna-timeline-item [isEven]="isEven"></jna-timeline-item>`
})
class TestComponent extends TimelineBaseItemComponent{
    public isEven:boolean = true;

    constructor(settingsService:TimelineSettingsService) {
        super(settingsService);
        this.settingsKey = "blogs";
        this.classSuffix = "font";
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
    }));

    it('should have the "reverse" class if the item is even', () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.isEven = true;
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        expect(component.isEven).toEqual(true);
        expect(fixture.componentInstance.getIconClass()["jna-icon-reverse-font"]).toEqual(true);
        expect(fixture.componentInstance.getIconClass()["jna-icon-font"]).toEqual(false);
    });

    it('should not have the "reverse" class if the item is odd', () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.isEven = false;
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        expect(component.isEven).toEqual(false);
        expect(fixture.componentInstance.getIconClass()["jna-icon-reverse-font"]).toEqual(false);
        expect(fixture.componentInstance.getIconClass()["jna-icon-font"]).toEqual(true);
    });

    it('should remove the "is-hidden" class based on settings key', () => {
        TestBed.compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        settingsService = fixture.debugElement.children[0].injector.get(TimelineSettingsService);

        expect(fixture.componentInstance.isHidden).toEqual(false);
        expect(fixture.nativeElement.classList.contains("is-hidden")).toEqual(false);
    });

    it('should add the "is-hidden" class based on settings key', () => {
        TestBed.compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        settingsService = fixture.debugElement.children[0].injector.get(TimelineSettingsService);
        settingsService.toggleSetting("blogs");
        fixture.detectChanges();

        expect(fixture.componentInstance.isHidden).toEqual(true);
        expect(fixture.nativeElement.classList.contains("is-hidden")).toEqual(true);
    });
});

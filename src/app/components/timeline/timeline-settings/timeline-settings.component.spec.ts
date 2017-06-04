import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {TimelineSettingsService} from "./timeline-settings.service";
import {TimelineSettingsComponent} from "./timeline-settings.component";
import {TickerService} from "../../../services/ticker.service";
import {Injectable} from "@angular/core";

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


describe('TimelineSettingsComponent', () => {
    let component:TimelineSettingsComponent,
        fixture:ComponentFixture<TimelineSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TimelineSettingsComponent
            ],
            providers: [
                TimelineSettingsService,
                {
                    provide: TickerService,
                    useClass: MockTickerService
                }
            ]
        });

        TestBed.compileComponents();

        fixture = TestBed.createComponent(TimelineSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should subscribe and react to the timeline-settings service', inject([TimelineSettingsService], (settingsService:TimelineSettingsService) => {
        expect(component.settings.experiments).toEqual(true);

        settingsService.toggleSetting("experiments");

        fixture.detectChanges();

        expect(component.settings.experiments).toEqual(false);
    }));

    it('should react to the title service on hover (hide)', inject([TickerService], (mockTicker:MockTickerService) => {
        let result:string = "hide github events";

        expect(component.title).toEqual("");
        component.onHover("commits");
        fixture.detectChanges();


        for(let i = 0; i <= result.length; i++) {
            mockTicker.tick();
            fixture.detectChanges();
        }

        expect(component.title).toEqual(result);
    }));

    it('should react to the title service on hover (show)', inject([TickerService, TimelineSettingsService], (mockTicker:MockTickerService, settingsService:TimelineSettingsService) => {
        let result:string = "show github events";
        fixture.detectChanges();

        settingsService.toggleSetting("commits");
        fixture.detectChanges();

        component.onHover("commits");

        fixture.detectChanges();

        for(let i = 0; i <= result.length; i++) {
            mockTicker.tick();
            fixture.detectChanges();
        }

        expect(component.title).toEqual(result);
    }));

    it('should react to the title service on mouse out', inject([TickerService], (mockTicker:MockTickerService) => {
        let result:string = "hide github events";

        expect(component.title).toEqual("");
        component.onHover("commits");
        fixture.detectChanges();

        mockTicker.tick();
        fixture.detectChanges();

        for(let i = 0; i < result.length; i++) {
            mockTicker.tick();
            fixture.detectChanges();
        }

        expect(component.title).toEqual(result);

        component.onOut();
        mockTicker.tick();
        fixture.detectChanges();

        expect(component.title).toEqual("");
    }));

    it('should toggle the setting on click', inject([TimelineSettingsService], (settingsService:TimelineSettingsService) => {
        spyOn(settingsService, "toggleSetting");
        fixture.detectChanges();
        component.onClick(new Event("click"), "commits");
        fixture.detectChanges();
        expect(settingsService.toggleSetting).toHaveBeenCalledWith("commits");
    }));

    it('should toggle the submenu', () => {
        fixture.detectChanges();

        let submenuStyle = component.getSubmenuClass();
        fixture.detectChanges();
        expect(submenuStyle.open).toEqual(false);

        component.toggleSubmenu();
        submenuStyle = component.getSubmenuClass();
        expect(submenuStyle.open).toEqual(true);

        component.toggleSubmenu();
        submenuStyle = component.getSubmenuClass();
        expect(submenuStyle.open).toEqual(false);
    });
});

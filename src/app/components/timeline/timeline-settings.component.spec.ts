import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {TimelineSettingsService} from "./timeline-settings.service";
import {TimelineSettingsComponent} from "./timeline-settings.component";
import {TickerService} from "../../services/ticker.service";
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

    it('should subscribe and react to the settings service', inject([TimelineSettingsService], (settingsService:TimelineSettingsService) => {
        expect(component.settings.githubEvents).toEqual(true);

        settingsService.toggleSetting("githubEvents");

        fixture.detectChanges();

        expect(component.settings.githubEvents).toEqual(false);
    }));

    it('should subscribe and react to the title service on hover', inject([TickerService], (mockTicker:MockTickerService) => {
        let result = "hide github events";

        expect(component.title).toEqual("");
        component.onHover("githubEvents");
        fixture.detectChanges();

        mockTicker.tick();
        fixture.detectChanges();

        for(let i = 0; i < result.length; i++) {
            mockTicker.tick();
            fixture.detectChanges();
        }

        expect(component.title).toEqual(result);
    }));

    it('should subscribe and react to the title service on mouse out', inject([TickerService], (mockTicker:MockTickerService) => {
        let result = "hide github events";

        expect(component.title).toEqual("");
        component.onHover("githubEvents");
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
});

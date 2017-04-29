import {TestBed} from '@angular/core/testing';
import {TimelineSettingsService} from "./timeline-settings.service";
import {ISettings} from "../../interfaces/settings";

describe('TimelineSettingsService', () => {

    let service:TimelineSettingsService,
        settings:ISettings;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TimelineSettingsService
            ]
        });

        service = TestBed.get(TimelineSettingsService);

        service.subscribe((s:ISettings) => {
            settings = s;
        });
    });

    it('should have a public setter which broadcasts to subscribers', () => {
        expect(settings["githubEvents"]).toEqual(true);
        expect(settings["githubRepos"]).toEqual(true);
        expect(settings["tweets"]).toEqual(true);
        expect(settings["blogs"]).toEqual(true);
        expect(settings["experiments"]).toEqual(true);
    });

    it('should toggle a setting by key name', () => {
        expect(settings["githubEvents"]).toEqual(true);

        service.toggleSetting("githubEvents");

        expect(settings["githubEvents"]).toEqual(false);
    });

});

import {TestBed, inject} from '@angular/core/testing';
import {AppConfigService} from "./app-config.service";
import {IAppConfig} from "../interfaces/app-config";

describe('AppConfigService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AppConfigService
            ]
        });
    });

    it('should provide a public subscribable', inject([AppConfigService], (service:AppConfigService) => {
        expect(service.subscribe).toBeTruthy();
    }));

    it('should update on resize', inject([AppConfigService], (service:AppConfigService) => {
        let count:number = 0;
        service.subscribe(() => {
            count++;
        });

        dispatchEvent(new Event('resize'));

        expect(count).toEqual(2);
    }));

    it('should update on load', inject([AppConfigService], (service:AppConfigService) => {
        let count:number = 0;
        service.subscribe(() => {
            count++;
        });

        dispatchEvent(new Event('load'));

        expect(count).toEqual(2);

    }));

    // it('should switch to mobile mode < 600', inject([AppConfigService], (service:AppConfigService) => {
    //     let response:IAppConfig;
    //     service.subscribe((config:IAppConfig) => {
    //         response = config;
    //     });
    //
    //     let event:any = new Event("resize");
    //     event.currentTarget.innerWidth = 599;
    //
    //     dispatchEvent(event);
    //
    //     expect(response.isMobile).toEqual(true);
    // }));
    //
    // it('should switch to desktop mode >= 600', inject([AppConfigService], (service:AppConfigService) => {
    //     let response:IAppConfig;
    //     service.subscribe((config:IAppConfig) => {
    //         response = config;
    //     });
    //
    //     let event:any = new Event("resize");
    //     event.currentTarget.innerWidth = 600;
    //
    //     dispatchEvent(event);
    //
    //     expect(response.isMobile).toEqual(false);
    // }));

});

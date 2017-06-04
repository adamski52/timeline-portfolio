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

    it('should switch from API url to HTML url', inject([AppConfigService], (service:AppConfigService) => {
        let url = service.getHtmlUrl("https://api.github.com/lolwat");
        expect(url).toEqual("https://www.github.com/lolwat");
    }));

    it('should switch from API repo url to HTML url', inject([AppConfigService], (service:AppConfigService) => {
        let url = service.getHtmlUrl("https://api.github.com/repos/lolwat/wutitdo");
        expect(url).toEqual("https://www.github.com/lolwat/wutitdo");
    }));

    it('should switch from API commit url to HTML url', inject([AppConfigService], (service:AppConfigService) => {
        let url = service.getHtmlUrl("https://api.github.com/lolwat/wutitdo/commits/12345");
        expect(url).toEqual("https://www.github.com/lolwat/wutitdo/commit/12345");
    }));


    it('should leave other URLs alone', inject([AppConfigService], (service:AppConfigService) => {
        let url = service.getHtmlUrl("http://www.github.com/dont-change-me");
        expect(url).toEqual("http://www.github.com/dont-change-me");
    }));
});

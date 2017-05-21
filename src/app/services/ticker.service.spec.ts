/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {TickerService} from "./ticker.service";

describe('TickerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TickerService
            ]
        });
    });

    it('should wrap setInterval', inject([TickerService], (tickerService:TickerService) => {
        spyOn(window, "setInterval");
        tickerService.start(123, () => {

        });
        expect(window.setInterval).toHaveBeenCalled();
    }));

    it('should wrap clearInterval', inject([TickerService], (tickerService:TickerService) => {
        spyOn(window, "clearInterval");
        tickerService.stop(123);
        expect(window.clearInterval).toHaveBeenCalled();
    }));
});

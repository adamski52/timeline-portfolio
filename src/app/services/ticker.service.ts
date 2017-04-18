import {Injectable} from '@angular/core';

@Injectable()
export class TickerService {
    public start(ms: number, handler: () => void): any {
        return setInterval(handler, ms);
    }

    public stop(interval:any):void {
        clearInterval(interval);
    }
}

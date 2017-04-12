import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {GenericHttpService} from './generic-http.service';
import {XHRBackend, HttpModule, Response, ResponseOptions} from "@angular/http";
import {ErrorService} from "./error.service";

describe('GenericHttpService', () => {
    let response,
        data = {
            data: "hello"
        };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                GenericHttpService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should provide a public subscribable', inject([GenericHttpService], (service:GenericHttpService) => {
        expect(service.subscribe).toBeTruthy();
    }));
});

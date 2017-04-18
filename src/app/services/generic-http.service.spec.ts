import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {GenericHttpService} from './generic-http.service';
import {XHRBackend, HttpModule, Response, ResponseOptions} from "@angular/http";
import {ErrorService} from "./error.service";

describe('GenericHttpService', () => {
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

    it('should fetch a given URL', inject([GenericHttpService, XHRBackend], (service:GenericHttpService, mockBackend:MockBackend) => {
        let response;

        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {message: "great success"}
            })));
        });

        service.subscribe((r:any) => {
            response = r;
        });

        service.fetch("http://www.example.com/");

        expect(response.message).toEqual("great success");
    }));
});

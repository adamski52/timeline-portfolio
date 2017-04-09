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

    it('should provide a public subscribable', inject([GenericHttpService], (service: GenericHttpService) => {
        expect(service.data$).toBeTruthy();
    }));

    it('should provide a public fetch method', inject([GenericHttpService, XHRBackend, ErrorService], (service: GenericHttpService, mockBackend: MockBackend, errorService:ErrorService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: data
            })));
        });

        service.data$.subscribe((r:any) => {
            response = r
        });

        service.fetch("fake");

        expect(response).toBe(data);
    }));

    it('should log an error if the end point fails', inject([GenericHttpService, XHRBackend, ErrorService], (service: GenericHttpService, mockBackend: MockBackend, errorService:ErrorService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockError(new Response(new ResponseOptions({
                status: 400
            })));
        });

        expect(errorService.getAll().length).toEqual(0);

        service.data$.subscribe((r) => {
            response = r;
        });

        service.fetch("fake");

        expect(errorService.getAll().length).toEqual(1);
    }));
});

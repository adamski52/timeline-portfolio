import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {ErrorService} from "../../services/error.service";
import {TimelineBlogService} from "./timeline-blog.service";

fdescribe('TimelineBlogService', () => {
    let response,
        data = {
            data: "hello"
        };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                TimelineBlogService,
                {
                    provide: XHRBackend, useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should notify subscribers with response', inject([TimelineBlogService, XHRBackend], (service:TimelineBlogService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: data
            })));
        });

        service.subscribe((r:any) => {
            response = r
        });

        service.fetch();

        expect(response).toBe(data);
    }));

    it('should log an error if the end point fails', inject([TimelineBlogService, XHRBackend, ErrorService], (service:TimelineBlogService, mockBackend:MockBackend, errorService:ErrorService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockError(new Response(new ResponseOptions({
                status: 400
            })));
        });

        expect(errorService.getAll().length).toEqual(0);

        service.subscribe((r) => {
            response = r;
        });

        service.fetch();

        expect(errorService.getAll().length).toEqual(1);
    }));
});

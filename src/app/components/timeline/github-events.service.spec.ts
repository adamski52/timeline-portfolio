import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {GithubEventsService} from './github-events.service';
import {ErrorService} from "../../services/error.service";

describe('GithubEventsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                GithubEventsService,
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

    it('should notify subscribers with response', inject([GithubEventsService, XHRBackend], (service:GithubEventsService, mockBackend:MockBackend) => {
        let response,
            data = {
                data: "hello"
            };

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

    it('should log an error if the end point fails', inject([GithubEventsService, XHRBackend, ErrorService], (service:GithubEventsService, mockBackend:MockBackend, errorService:ErrorService) => {
        let response;

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

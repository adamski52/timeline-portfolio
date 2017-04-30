import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {GithubEventsService} from './github-events.service';
import {ErrorService} from "../../services/error.service";
import {IEvent} from "../../interfaces/event";

describe('GithubEventsService', () => {
    let mockData:IEvent[] = require("../../../../mocks/events.json"),
        response:IEvent[];

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

    it('should remove refs/heads/ from event message', inject([GithubEventsService, XHRBackend], (service:GithubEventsService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEvent[]) => {
            response = r;
        });

        service.fetch();

        expect(service.getEventMessage(response[2])).toBe("pushed to master");
    }));

    it('should remove refs/heads/ from commit message', inject([GithubEventsService, XHRBackend], (service:GithubEventsService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEvent[]) => {
            response = r;
        });

        service.fetch();

        expect(service.getEventMessage(response[2])).toBe("pushed to master");
    }));

    it('should use ref name for create events', inject([GithubEventsService, XHRBackend], (service:GithubEventsService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEvent[]) => {
            response = r;
        });

        service.fetch();

        expect(service.getEventMessage(response[4])).toBe("created refactor/service-streamlining");
    }));

    it('should notify subscribers with response', inject([GithubEventsService, XHRBackend], (service:GithubEventsService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEvent[]) => {
            response = r;
        });

        service.fetch();

        expect(response).toBe(mockData);
    }));

    it('should log an error if the end point fails', inject([GithubEventsService, XHRBackend, ErrorService], (service:GithubEventsService, mockBackend:MockBackend, errorService:ErrorService) => {
        let response;

        mockBackend.connections.subscribe((connection) => {
            connection.mockError(new Response(new ResponseOptions({
                status: 400
            })));
        });

        expect(errorService.getAll().length).toEqual(0);

        service.subscribe((r:IEvent[]) => {
            response = r;
        });

        service.fetch();

        expect(errorService.getAll().length).toEqual(1);
    }));
});

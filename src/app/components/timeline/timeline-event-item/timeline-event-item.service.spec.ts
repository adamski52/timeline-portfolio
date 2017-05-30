import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {TimelineEventService} from './timeline-event-item.service';
import {ErrorService} from "../../../services/error.service";
import {IEvent} from "../../../interfaces/event";
import {IEventCollection} from "../../../interfaces/event-collection";
import {AppConfigService} from "../../../services/app-config.service";

describe('TimelineEventService', () => {
    let mockData:IEvent[] = require("../../../../../mocks/events.json"),
        response:IEventCollection;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                AppConfigService,
                TimelineEventService,
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

    it('should remove refs/heads/ from commit message', inject([TimelineEventService, XHRBackend], (service:TimelineEventService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEventCollection) => {
            response = r;
        });

        service.fetch();

        expect(service.getEventMessage(response.commits[2])).toEqual("pushed to master");
    }));

    it('should use ref name for create events', inject([TimelineEventService, XHRBackend], (service:TimelineEventService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEventCollection) => {
            response = r;
        });

        service.fetch();

        expect(service.getEventMessage(response.branches[0])).toEqual("created refactor/service-streamlining");
    }));

    it('should use "created branch" for branch events commit message', inject([TimelineEventService, XHRBackend], (service:TimelineEventService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEventCollection) => {
            response = r;
        });

        service.fetch();

        expect(service.getCommitMessage(response.branches[0])).toEqual("created branch");
    }));

    it('should use the commit message for commit events', inject([TimelineEventService, XHRBackend], (service:TimelineEventService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEventCollection) => {
            response = r;
        });

        service.fetch();

        expect(service.getCommitMessage(response.commits[0])).toEqual("fixed thumbnail tests.");
    }));

    it('should notify subscribers with response', inject([TimelineEventService, XHRBackend], (service:TimelineEventService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockData
            })));
        });

        service.subscribe((r:IEventCollection) => {
            response = r;
        });

        service.fetch();

        expect(response.commits.length).toEqual(23);
        expect(response.branches.length).toEqual(7);
    }));

    it('should log an error if the end point fails', inject([TimelineEventService, XHRBackend, ErrorService], (service:TimelineEventService, mockBackend:MockBackend, errorService:ErrorService) => {
        let response;

        mockBackend.connections.subscribe((connection) => {
            connection.mockError(new Response(new ResponseOptions({
                status: 400
            })));
        });

        expect(errorService.getAll().length).toEqual(0);

        service.subscribe((r:IEventCollection) => {
            response = r;
        });

        service.fetch();

        expect(errorService.getAll().length).toEqual(1);
    }));
});

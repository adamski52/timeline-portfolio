import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {TimelineRepoService} from './timeline-repo-item.service';
import {ErrorService} from "../../../services/error.service";
import {IRepo} from "../../../interfaces/repo";

describe('TimelineRepoService', () => {
    let response,
        repoData:IRepo[] = require("../../../../../mocks/repos.json");

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                TimelineRepoService,
                {
                    provide: XHRBackend, useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should add $$type to all items', inject([TimelineRepoService, XHRBackend], (service:TimelineRepoService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoData
            })));
        });

        service.subscribe((repos:IRepo[]) => {
            response = repos;
        });

        service.fetch();

        expect(response[0].$$type).toEqual("repos");
    }));

    it('should notify subscribers with response', inject([TimelineRepoService, XHRBackend], (service:TimelineRepoService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: repoData
            })));
        });

        service.subscribe((r:any) => {
            response = r
        });

        service.fetch();

        expect(response).toBe(repoData);
    }));

    it('should log an error if the end point fails', inject([TimelineRepoService, XHRBackend, ErrorService], (service:TimelineRepoService, mockBackend:MockBackend, errorService:ErrorService) => {
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

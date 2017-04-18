/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {GithubRepoThumbnailService} from "./repo-thumbnail.service";
import {MockBackend} from '@angular/http/testing';
import {XHRBackend, Response, ResponseOptions, HttpModule} from '@angular/http';
import {ErrorService} from "../../services/error.service";

describe('RepoLanguagesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GithubRepoThumbnailService,
                ErrorService,
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

    it('should notify subscribers with response', inject([GithubRepoThumbnailService, XHRBackend], (service:GithubRepoThumbnailService, mockBackend:MockBackend) => {
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

        service.fetch("fake");

        expect(response).toBe(data);
    }));

    it('should log an error if the end point fails', inject([XHRBackend, GithubRepoThumbnailService, ErrorService], (mockBackend: MockBackend, service: GithubRepoThumbnailService, errorService:ErrorService) => {
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

        service.fetch("fake");

        expect(errorService.getAll().length).toEqual(1);
    }));
});

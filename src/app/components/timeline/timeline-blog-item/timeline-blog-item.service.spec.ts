import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {ErrorService} from "../../../services/error.service";
import {TimelineBlogService} from "./timeline-blog-item.service";
import {IBlog} from "../../../interfaces/blog";

describe('TimelineBlogService', () => {
    let response,
        data = require("../../../../../mocks/posts.json");

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                TimelineBlogService,

            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should add $$type to all items', inject([TimelineBlogService, XHRBackend], (service:TimelineBlogService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: data
            })));
        });

        service.subscribe((blogs:IBlog[]) => {
            response = blogs;
        });

        service.fetch();

        expect(response[0].$$type).toEqual("blogs");
    }));

    it('should notify subscribers with response', inject([TimelineBlogService, XHRBackend], (service:TimelineBlogService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: data
            })));
        });

        service.subscribe((blogs:IBlog[]) => {
            response = blogs;
        });

        service.fetch();

        expect(response.length).toBe(1);
    }));

    it('should notify subscribers with just the items portion of the payload', inject([TimelineBlogService, XHRBackend], (service:TimelineBlogService, mockBackend:MockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: data
            })));
        });

        service.subscribe((blogs:IBlog[]) => {
            response = blogs;
        });

        service.fetch();

        expect(response[0]).toBe(data.items[0]);
    }));

    it('should log an error if the end point fails', inject([TimelineBlogService, XHRBackend, ErrorService], (service:TimelineBlogService, mockBackend:MockBackend, errorService:ErrorService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockError(new Response(new ResponseOptions({
                status: 400
            })));
        });

        expect(errorService.getAll().length).toEqual(0);

        service.fetch();

        expect(errorService.getAll().length).toEqual(1);
    }));
});

import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {GithubHttpService} from './github-http.service';

describe('GithubHttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GithubHttpService,
                {
                    provide: XHRBackend, useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should send the token with any GET requests', inject([GithubHttpService, XHRBackend], (service: GithubHttpService, mockBackend:MockBackend) => {
        let auth:string = "";

        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: "fake"
            })));
            auth = connection.request.headers.get('Authorization');
        });

        service.get("/fake/url");
        expect(auth.indexOf("token")).toBe(0);
    }));
});

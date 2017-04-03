import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {GithubGenericService} from './github-generic.service';
import {XHRBackend, HttpModule, Response, ResponseOptions} from "@angular/http";
import {ErrorService} from "./error.service";

describe('GithubGenericService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
                GithubGenericService,
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

    it('should provide a public subscribable', inject([GithubGenericService], (service: GithubGenericService) => {
        expect(service.data$).toBeTruthy();
    }));

    it('should provide a public fetch method', inject([GithubGenericService, XHRBackend, ErrorService], (service: GithubGenericService, mockBackend: MockBackend, errorService:ErrorService) => {
        let response,
            data = {
                data: "hello"
            };

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
});

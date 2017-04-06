import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {GithubGenericService} from './github-generic.service';
import {XHRBackend, HttpModule, Response, ResponseOptions} from "@angular/http";
import {ErrorService} from "./error.service";

describe('GithubGenericService', () => {
    let response,
        data = {
            data: "hello"
        };

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

    it('should log an error if the end point fails', inject([GithubGenericService, XHRBackend, ErrorService], (service: GithubGenericService, mockBackend: MockBackend, errorService:ErrorService) => {
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

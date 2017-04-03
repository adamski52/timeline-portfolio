import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {GithubGenericService} from './github-generic.service';
import {XHRBackend, HttpModule} from "@angular/http";
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
});

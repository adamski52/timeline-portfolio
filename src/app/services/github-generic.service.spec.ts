import {TestBed, inject} from '@angular/core/testing';

import {GithubGenericService} from './github-generic.service';

describe('GithubGenericServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GithubGenericService]
        });
    });

    it('should provide a public subscribable', inject([GithubGenericService], (service: GithubGenericService) => {
        expect(service.data$).toBeTruthy();
    }));
});

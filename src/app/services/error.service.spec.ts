/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {ErrorService} from './error.service';

import {IError} from "../interfaces/error";

describe('Error Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService
            ]
        });
    });

    it('should expose a subscribable source', inject([ErrorService], (errorService: ErrorService) => {
        expect(errorService.data$).toBeDefined();
    }));

    it('should store new errors', inject([ErrorService], (errorService:ErrorService) => {
        errorService.add("oh no", 0);
        expect(errorService.getAll().length).toEqual(1);
    }));

    it('should give each error an ID', inject([ErrorService], (errorService:ErrorService) => {
        errorService.add("oh no", 0);
        expect(errorService.getAll()[0].id).toBeDefined();
    }));

    it('should retrieve an error by ID', inject([ErrorService], (errorService:ErrorService) => {
        errorService.add("oh no", 0);
        let error:IError = errorService.getAll()[0];
        let match:IError = errorService.getById(error.id);

        expect(match.id).toEqual(error.id);
    }));

    it('should retrieve errors by type', inject([ErrorService], (errorService:ErrorService) => {
        errorService.add("oh no", 0);
        errorService.add("oh no", 0);
        errorService.add("oh no", 1);
        errorService.add("oh no", 2);
        errorService.add("oh no", 3);

        expect(errorService.getByType(0).length).toEqual(2);
    }));

    it('should remove a specific error', inject([ErrorService], (errorService:ErrorService) => {
        errorService.add("not it", 0);
        errorService.add("pick me", 0);
        errorService.add("not it", 0);

        let error:IError = errorService.getAll()[1];

        errorService.remove(error);

        expect(errorService.getAll().length).toEqual(2);
        expect(errorService.getAll()[1].description).toEqual("not it");
    }));

    it('should remove all errors', inject([ErrorService], (errorService:ErrorService) => {
        errorService.add("oh no", 0);
        errorService.add("oh no", 0);
        errorService.add("oh no", 0);

        expect(errorService.getAll().length).toEqual(3);
        errorService.removeAll();

        expect(errorService.getAll().length).toEqual(0);
    }));


    it('should broadcast to all subscribers when a new item is added', inject([ErrorService], (errorService:ErrorService) => {
        let receivedErrors:IError[] = [];
        errorService.data$.subscribe((errors:IError[]) => {
            receivedErrors = errors;
        });

        errorService.add("oh no", 0);
        expect(receivedErrors.length).toBe(1);
    }));

    it('should broadcast to all subscribers when an item is removed', inject([ErrorService], (errorService:ErrorService) => {
        let receivedErrors:IError[] = [];
        errorService.data$.subscribe((errors:IError[]) => {
            receivedErrors = errors;
        });

        errorService.add("oh no", 0);
        errorService.remove(receivedErrors[0]);

        expect(receivedErrors.length).toBe(0);
    }));

    it('should broadcast to all subscribers when all items are removed', inject([ErrorService], (errorService:ErrorService) => {
        let receivedErrors:IError[] = [];
        errorService.data$.subscribe((errors:IError[]) => {
            receivedErrors = errors;
        });

        errorService.add("oh no", 0);
        errorService.removeAll();

        expect(receivedErrors.length).toBe(0);
    }));

    it('should not broadcast when there were no items to remove (remove all)', inject([ErrorService], (errorService:ErrorService) => {
        let receivedErrors:IError[];
        errorService.data$.subscribe((errors:IError[]) => {
            receivedErrors = errors;
        });

        errorService.removeAll();

        expect(receivedErrors).toBeUndefined();
    }));


    it('should not broadcast when an attempt was made to remove an item which doesnt exist', inject([ErrorService], (errorService:ErrorService) => {
        let receivedErrors:IError[] = [];
        errorService.data$.subscribe((errors:IError[]) => {
            receivedErrors = errors;
        });

        let fakeError:IError = {
            id: -1,
            description: "fake",
            type: 0
        };

        errorService.add("oh no", 0);
        expect(receivedErrors.length).toEqual(1);

        errorService.remove(fakeError);
        expect(receivedErrors.length).toEqual(1);
    }));

});

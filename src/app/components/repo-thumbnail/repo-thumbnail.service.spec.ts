/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {GithubRepoThumbnailService} from "./repo-thumbnail.service";
import {IThumbnail} from "../../interfaces/thumbnail";

describe('RepoLanguagesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GithubRepoThumbnailService
            ]
        });
    });
});

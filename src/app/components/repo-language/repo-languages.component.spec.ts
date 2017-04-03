import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoLanguagesComponent } from './repo-languages.component';
import {GithubGenericService} from "../../services/github-generic.service";
import {ErrorService} from "../../services/error.service";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {GithubRepoLanguagesService} from "../../services/github-repo-languages.service";

describe('RepoLanguagesComponent', () => {
    let component: RepoLanguagesComponent;
    let fixture: ComponentFixture<RepoLanguagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RepoLanguagesComponent
            ],
            providers: [
                GithubGenericService,
                GithubRepoLanguagesService,
                ErrorService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepoLanguagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

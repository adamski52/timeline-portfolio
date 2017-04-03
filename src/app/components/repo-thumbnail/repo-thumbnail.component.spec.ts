import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoThumbnailComponent } from './repo-thumbnail.component';
import {GithubGenericService} from "../../services/github-generic.service";
import {ErrorService} from "../../services/error.service";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('RepoThumbnailComponent', () => {
    let component: RepoThumbnailComponent;
    let fixture: ComponentFixture<RepoThumbnailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RepoThumbnailComponent
            ],
            providers: [
                GithubGenericService,
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
        fixture = TestBed.createComponent(RepoThumbnailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {TimelineComponent} from "./components/timeline/timeline.component";
import {GithubUserService} from "./services/github-user.service";
import {GithubReposService} from "./services/github-repos.service";
import {GithubEventsService} from "./services/github-events.service";
import {ErrorService} from "./services/error.service";
import {HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TimelineComponent
      ],
      providers: [
        GithubUserService,
        GithubReposService,
        GithubEventsService,
        ErrorService,
        {
          provide: XHRBackend, useClass: MockBackend
        }
      ],
      imports: [
        HttpModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

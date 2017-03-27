import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';

import {GithubUserService} from './github-user.service';
import {GithubHttpService} from "./github-http.service";
import {ErrorService} from "./error.service";

describe('GithubUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService,
        GithubUserService,
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

  it('should send token with requests', inject([GithubUserService, XHRBackend], (service: GithubUserService, mockBackend: MockBackend) => {
    let auth: string = "";

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: "fake"
      })));
      auth = connection.request.headers.get('Authorization');
    });

    service.fetch();
    expect(auth.indexOf("token")).toBe(0);
  }));

  it('should notify subscribers with response', inject([GithubUserService, XHRBackend], (service: GithubUserService, mockBackend: MockBackend) => {
    let response:string,
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

    service.fetch();

    expect(response).toBe(data);
  }));

  it('should notify subscribers with response', inject([GithubUserService, XHRBackend], (service: GithubUserService, mockBackend: MockBackend) => {
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

    service.fetch();

    expect(response).toBe(data);
  }));

  it('should log an error if the end point fails', inject([GithubUserService, XHRBackend, ErrorService], (service: GithubUserService, mockBackend: MockBackend, errorService:ErrorService) => {
    let response;

    mockBackend.connections.subscribe((connection) => {
      connection.mockError(new Response(new ResponseOptions({
        status: 400
      })));
    });

    expect(errorService.getAll().length).toEqual(0);

    service.data$.subscribe((r) => {
      response = r;
    });

    service.fetch();

    expect(errorService.getAll().length).toEqual(1);
  }));
});

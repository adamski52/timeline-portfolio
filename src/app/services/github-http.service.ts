import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, Response, Headers} from '@angular/http';

@Injectable()
export class GithubHttpService {
    private _token: string = "98b05423d5b836777062fa549732f698f7193041";

    constructor(private _http: Http) {}

    private getAuthorizationHeaders(): Headers {
        let headers: Headers = new Headers();

        headers.append('Authorization', 'token ' + this._token);

        return headers;
    }

    public get(url: string): Observable<Response> {
        return this._http.get(url, {
            headers: this.getAuthorizationHeaders()
        });
    }
}

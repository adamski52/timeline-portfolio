import {Injectable} from '@angular/core';
import {GithubHttpService} from './github-http.service';
import {GithubGenericService} from "./github-generic.service";
import {Response} from "@angular/http";
import {ErrorService} from "./error.service";

@Injectable()
export class GithubUserService extends GithubGenericService {
    constructor(private http: GithubHttpService, private errorService: ErrorService) {
        super();
    }

    public fetch(): void {
        this.http.get("https://api.github.com/users/adamski52").subscribe((response: Response) => {
                this.broadcast(response);
            },
            (error: Response) => {
                this.errorService.add("Failed to load profile.", error.status);
            });
    }
}

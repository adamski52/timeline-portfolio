import {Injectable} from '@angular/core';
import {GithubGenericService} from "./github-generic.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "./error.service";

@Injectable()
export class GithubUserService extends GithubGenericService {
    constructor(private http: Http, private errorService: ErrorService) {
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

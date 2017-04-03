import {Injectable} from '@angular/core';
import {GithubGenericService} from "./github-generic.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "./error.service";

@Injectable()
export class GithubReposService extends GithubGenericService {
    constructor(protected http: Http, protected errorService: ErrorService) {
        super(http, errorService)
    }

    public fetch(): void {
        this.http.get("/api/users/adamski52/repos").subscribe((response: Response) => {
            this.broadcast(response.json());
        },
        (error: Response) => {
            this.errorService.add("Failed to load repos.", error.status);
        });
    }
}

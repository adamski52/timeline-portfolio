import {Component, Input, OnInit} from '@angular/core';
import {GithubGenericService} from '../../services/github-generic.service';

@Component({
    selector: 'jna-repo-thumbnail',
    templateUrl: './repo-thumbnail.component.html',
    providers: [
        GithubGenericService
    ]
})
export class RepoThumbnailComponent {
    @Input("repo") repo:string;

    public thumbnail:string;

    constructor(private service: GithubGenericService) {
        this.service.data$.subscribe((response) => {
            this.thumbnail = response.download_url;
        });
    }

    ngOnInit() {
        if(this.repo) {
            this.service.fetch("/api/repos/adamski52/" + this.repo + "/contents/thumbnail.png");
        }
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {GithubRepoThumbnailService} from "./repo-thumbnail.service";
import {IThumbnail} from "../../interfaces/thumbnail";

@Component({
    selector: 'jna-repo-thumbnail',
    templateUrl: './repo-thumbnail.component.html',
    providers: [
        GithubRepoThumbnailService
    ]
})
export class RepoThumbnailComponent {
    @Input("repo") repo:string;

    public thumbnail:string;

    constructor(private thumbnailService:GithubRepoThumbnailService) {
        this.thumbnailService.subscribe((thumbnail:IThumbnail) => {
            this.thumbnail = thumbnail.download_url;
        });
    }

    ngOnInit() {
        if (this.repo) {
            this.thumbnailService.fetch(this.repo);
        }
    }
}

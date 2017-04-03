/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {GithubRepoLanguagesService} from "../../services/github-repo-languages.service";
import {IObject} from "../../interfaces/object";

describe('RepoLanguagesService', () => {
    let languageMap: IObject = {
        "typescript": "angular",
        "sql": "mysql-alt",
        "scss": "sass",
        "sass": "sass",
        "css": "css3-alt",
        "jsx": "reactjs",
        "html": "html5-alt",
        "javascript": "javascript-alt",
        "java": "java-bold",
        "svg": "svg",
        "python": "python",
        "ruby": "ruby",
        "shell": "script",
        "powershell": "shell",
        "batchfile": "shell",
        "apacheconf": "apache",
        "php": "php-alt",
        "xml": "html",
        "nginx": "nginx",
        "maven pom": "java-bold",
        "json": "javascript-alt",
        "django": "python",
        "gradle": "java-bold",
        "go": "go",
        "dockerfile": "docker",
        "clojure": "clojure",
        "c#": "csharp"
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GithubRepoLanguagesService
            ]
        });
    });

    function testMatch(language: string, iconClass: string) {
        iconClass = "icon-" + iconClass;
        it('should return "' + iconClass + "' for " + language, inject([GithubRepoLanguagesService], (repoLanguagesService: GithubRepoLanguagesService) => {
            expect(repoLanguagesService.getIconClass(language)).toEqual(iconClass);
        }));
    }


    it('should return an icon class, prefixed with "icon-"', inject([GithubRepoLanguagesService], (repoLanguagesService: GithubRepoLanguagesService) => {
        expect(repoLanguagesService.getIconClass("lol").substr(0, 5)).toEqual("icon-");
    }));

    it('should return the icon-css (because it looks most like a generic script icon) when a language is unknown', inject([GithubRepoLanguagesService], (repoLanguagesService: GithubRepoLanguagesService) => {
        expect(repoLanguagesService.getIconClass("lol")).toEqual("icon-css");
    }));

    for (let language in languageMap) {
        testMatch(language, languageMap[language]);
    }
});

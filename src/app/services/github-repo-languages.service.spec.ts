/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {GithubRepoLanguagesService} from "./github-repo-languages.service";
import {ILanguage} from "../interfaces/interfaces";

describe('RepoLanguagesService', () => {
    let languageMap = {
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

    it('should return an array of name/iconClass pairs', inject([GithubRepoLanguagesService], (repoLanguagesService: GithubRepoLanguagesService) => {
        let languages = {
            "TypeScript": 123,
            "JavaScript": 456
        };

        let result = repoLanguagesService.makeArray(languages);

        expect(result.length).toEqual(2);
        expect(result[0]["name"]).toEqual("TypeScript");
        expect(result[0]["iconClass"]).toEqual("icon-angular");
        expect(result[1]["name"]).toEqual("JavaScript");
        expect(result[1]["iconClass"]).toEqual("icon-javascript-alt");
    }));

    it('should return "other" if no languages are specified', inject([GithubRepoLanguagesService], (repoLanguagesService: GithubRepoLanguagesService) => {
        let languages = {};

        let result:ILanguage[] = repoLanguagesService.makeArray(languages);

        expect(result.length).toEqual(1);
        expect(result[0]["name"]).toEqual("Other");
        expect(result[0]["iconClass"]).toEqual("icon-jna-file-alt");
    }));
});

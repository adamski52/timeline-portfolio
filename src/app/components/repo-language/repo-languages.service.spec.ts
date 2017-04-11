/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {GithubRepoLanguagesService} from "./repo-languages.service";
import {MockBackend} from '@angular/http/testing';
import {XHRBackend, Response, ResponseOptions, HttpModule} from '@angular/http';
import {ErrorService} from "../../services/error.service";

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

    let mockData = {
        "TypeScript": 1234,
        "SQL": 1234,
        "SCSS": 1234,
        "SASS": 1234,
        "CSS": 1234,
        "JSX": 1234,
        "HTML": 1234,
        "JavaScript": 1234,
        "Java": 1234,
        "SVG": 1234,
        "Python": 1234,
        "Ruby": 1234,
        "Shell": 1234,
        "PowerShell": 1234,
        "Batchfile": 1234,
        "Apacheconf": 1234,
        "PHP": 1234,
        "XML": 1234,
        "Nginx": 1234,
        "Maven POM": 1234,
        "JSON": 1234,
        "Django": 1234,
        "Gradle": 1234,
        "Go": 1234,
        "Dockerfile": 1234,
        "Clojure": 1234,
        "C#": 1234
    };


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GithubRepoLanguagesService,
                ErrorService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ],
            imports: [
               HttpModule
            ]
        });
    });


    function testMatch(language: string) {
        let lowercaseLanguage = language.toLowerCase(),
            iconClass:string = "icon-" + languageMap[lowercaseLanguage],
            bodyObj = {};

        bodyObj[language] = mockData[language];

        it('should return "' + iconClass + "' for " + language, inject([XHRBackend, GithubRepoLanguagesService], (mockBackend: MockBackend, repoLanguagesService: GithubRepoLanguagesService) => {
            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: bodyObj
                })));
            });

            repoLanguagesService.fetch("lol");
            expect(repoLanguagesService.data.length).toEqual(1);
            expect(repoLanguagesService.data[0].iconClass).toEqual(iconClass);
            expect(repoLanguagesService.data[0].name).toEqual(language);
            expect(repoLanguagesService.data[0].size).toEqual(mockData[language]);
        }));
    }


    it('should return an icon class, prefixed with "icon-"', inject([XHRBackend, GithubRepoLanguagesService], (mockBackend: MockBackend, repoLanguagesService: GithubRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Nginx": 1234
                }
            })));
        });

        repoLanguagesService.fetch("lol");
        expect(repoLanguagesService.data.length).toEqual(1);
        expect(repoLanguagesService.data[0].iconClass).toEqual("icon-nginx");
        expect(repoLanguagesService.data[0].name).toEqual("Nginx");
        expect(repoLanguagesService.data[0].size).toEqual(1234);
    }));

    it('should return icon-css (because it looks most like a generic script icon) when a language is unknown', inject([XHRBackend, GithubRepoLanguagesService], (mockBackend: MockBackend, repoLanguagesService: GithubRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Don Johnsonscript": 9999999999
                }
            })));
        });

        repoLanguagesService.fetch("lol");
        expect(repoLanguagesService.data.length).toEqual(1);
        expect(repoLanguagesService.data[0].iconClass).toEqual("icon-css");
        expect(repoLanguagesService.data[0].name).toEqual("Don Johnsonscript");
        expect(repoLanguagesService.data[0].size).toEqual(9999999999);
    }));

    for (let language in mockData) {
        testMatch(language);
    }

    it('should convert the github object to an array of name/iconClass/size', inject([XHRBackend, GithubRepoLanguagesService], (mockBackend: MockBackend, repoLanguagesService: GithubRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "TypeScript": 1234
                }
            })));
        });

        repoLanguagesService.fetch("lol");
        expect(repoLanguagesService.data.length).toEqual(1);
        expect(repoLanguagesService.data[0].iconClass).toEqual("icon-angular");
        expect(repoLanguagesService.data[0].name).toEqual("TypeScript");
        expect(repoLanguagesService.data[0].size).toEqual(1234);
    }));

    it('should return "other" if no languages are specified', inject([XHRBackend, GithubRepoLanguagesService], (mockBackend: MockBackend, repoLanguagesService: GithubRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {}
            })));
        });

        repoLanguagesService.fetch("lol");
        expect(repoLanguagesService.data[0].iconClass).toEqual("icon-jna-file-alt");
        expect(repoLanguagesService.data[0].name).toEqual("Other");
        expect(repoLanguagesService.data[0].size).toEqual(undefined);
    }));
});

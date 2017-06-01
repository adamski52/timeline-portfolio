import {TestBed, inject} from '@angular/core/testing';
import {TimelineRepoLanguagesService} from "./timeline-repo-languages.service";
import {MockBackend} from '@angular/http/testing';
import {XHRBackend, Response, ResponseOptions, HttpModule} from '@angular/http';
import {ErrorService} from "../../../services/error.service";
import {ILanguage} from "../../../interfaces/language";

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

    let languages:ILanguage[];


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TimelineRepoLanguagesService,
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

    function testMatch(language:string) {
        let lowercaseLanguage = language.toLowerCase(),
            iconClass:string = "icon-" + languageMap[lowercaseLanguage],
            bodyObj = {};

        bodyObj[language] = mockData[language];

        it('should return "' + iconClass + "' for " + language, inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: bodyObj
                })));
            });

            repoLanguagesService.fetch("lol");
            repoLanguagesService.subscribe((langs:ILanguage[]) => {
                languages = langs;
            });
            expect(languages[0].iconClass).toEqual(iconClass);
        }));
    }

    it('should append the percentage for each language in the set', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Nginx": 50,
                    "Go": 49,
                    "XML": 1
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");

        expect(languages[0].name).toEqual("Nginx");
        expect(languages[1].name).toEqual("Go");
        expect(languages[2].name).toEqual("XML");
    }));

    it('should sort languages by size in descending order', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Nginx": 30,
                    "Go": 60,
                    "XML": 10
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");
        expect(languages[0].name).toEqual("Go");
        expect(languages[1].name).toEqual("Nginx");
        expect(languages[2].name).toEqual("XML");
    }));

    it('should return display name as < 1% instead of 0%', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Nginx": 99,
                    "XML": .8,
                    "Go": .2
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");
        expect(repoLanguagesService.getDisplayName(languages[2])).toEqual("Go (< 1%)");
    }));

    it('should say > 99% instead of 100%, when there is more than 1 language', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Nginx": 99.8,
                    "Go": .2
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");

        expect(repoLanguagesService.getDisplayName(languages[0])).toEqual("Nginx (> 99%)");
    }));

    it('should say 100%, when there is only 1 language', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Nginx": 100
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");

        expect(repoLanguagesService.getDisplayName(languages[0])).toEqual("Nginx (100%)");
    }));

    it('should round to nearest percentage', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Nginx": 49.6,
                    "XML": 50.4
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");

        expect(repoLanguagesService.getDisplayName(languages[0])).toEqual("Nginx (50%)");
        expect(repoLanguagesService.getDisplayName(languages[1])).toEqual("XML (50%)");
    }));

    it('should return an icon class, prefixed with "icon-"', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Nginx": 1234
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");
        expect(languages[0].iconClass).toEqual("icon-nginx");
    }));

    it('should return icon-css (because it looks most like a generic script icon) when a language is unknown', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "Don Johnsonscript": 9999999999
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");

        expect(languages.length).toEqual(1);
        expect(languages[0].iconClass).toEqual("icon-css");
        expect(languages[0].name).toEqual("Don Johnsonscript");
        expect(languages[0].percentage).toEqual(100);
    }));

    for (let language in mockData) {
        testMatch(language);
    }

    it('should convert the github object to an array of name/iconClass/percentage', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {
                    "TypeScript": 1234
                }
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");

        expect(languages.length).toEqual(1);
        expect(languages[0].iconClass).toEqual("icon-angular");
        expect(languages[0].name).toEqual("TypeScript");
        expect(languages[0].percentage).toEqual(100);
    }));

    it('should return "other" if no languages are specified', inject([XHRBackend, TimelineRepoLanguagesService], (mockBackend:MockBackend, repoLanguagesService:TimelineRepoLanguagesService) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {}
            })));
        });

        repoLanguagesService.subscribe((langs:ILanguage[]) => {
            languages = langs;
        });

        repoLanguagesService.fetch("lol");
        expect(languages[0].iconClass).toEqual("jna-icon-file-alt");
        expect(languages[0].name).toEqual("Other");
        expect(languages[0].percentage).toEqual(100);
    }));

    it('should notify subscribers with response', inject([TimelineRepoLanguagesService, XHRBackend], (service:TimelineRepoLanguagesService, mockBackend:MockBackend) => {
        let response,
            data = {
                "TypeScript": 1234
            };

        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: data
            })));
        });

        service.subscribe((r:any) => {
            response = r;
        });

        service.fetch("fake");

        expect(response[0].name).toEqual("TypeScript");
        expect(response[0].iconClass).toEqual("icon-angular");
        expect(response[0].percentage).toEqual(100);
    }));

    it('should log an error if the end point fails', inject([XHRBackend, TimelineRepoLanguagesService, ErrorService], (mockBackend: MockBackend, repoLanguagesService: TimelineRepoLanguagesService, errorService:ErrorService) => {
        let response;

        mockBackend.connections.subscribe((connection) => {
            connection.mockError(new Response(new ResponseOptions({
                status: 400
            })));
        });

        expect(errorService.getAll().length).toEqual(0);

        repoLanguagesService.subscribe((r) => {
            response = r;
        });

        repoLanguagesService.fetch("fake");

        expect(errorService.getAll().length).toEqual(1);
    }));
});

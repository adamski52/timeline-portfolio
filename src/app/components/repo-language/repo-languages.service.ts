import {Injectable} from '@angular/core';
import {GenericHttpService} from "../../services/generic-http.service";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../../services/error.service";
import {ILanguage, ILanguageMeta} from "../../interfaces/language";

@Injectable()
export class GithubRepoLanguagesService extends GenericHttpService {
    private languageMap:{[key: string]: string} = {
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

    private _data:ILanguage[];

    constructor(protected http:Http, protected errorService:ErrorService) {
        super(http, errorService);
    }

    private getIconClass(language:string):string {
        language = language.toLowerCase();
        if(this.languageMap[language]) {
            return "icon-" + this.languageMap[language];
        }

        return "icon-css";
    }

    private makeArray(languages:ILanguageMeta):ILanguage[] {
        let languageList:ILanguage[] = [];

        for(let language in languages) {
            languageList.push({
                name: language,
                iconClass: this.getIconClass(language),
                size: languages[language]
            });
        }

        if(languageList.length <= 0) {
            languageList.push({
                name: "Other",
                iconClass: "icon-jna-file-alt"
            });
        }

        return languageList;
    }

    public fetch(repoName:string):void {
        this.http.get("/api/repos/adamski52/" + repoName + "/languages").subscribe((response: Response) => {
            this._data = this.makeArray(response.json());

            this.broadcast(this.data);
        },
        (error: Response) => {
            this.errorService.add("Failed to load events.", error.status);
        });
    }

    public get data():ILanguage[] {
        return this._data;
    }
}
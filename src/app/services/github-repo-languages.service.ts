import {Injectable} from '@angular/core';
import {IObject} from "../interfaces/object";

@Injectable()
export class GithubRepoLanguagesService {
    private languageMap:{[key: string]: string};

    constructor() {
        this.languageMap = {
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
    }

    public getIconClass(language:string) {
        language = language.toLowerCase();
        if(this.languageMap[language]) {
            return "icon-" + this.languageMap[language];
        }

        return "icon-css";
    }

    public makeArray(languages:any):IObject[] {
        let languageList:IObject[] = [];

        for(let language in languages) {
            languageList.push({
                name: language,
                iconClass: this.getIconClass(language)
            });
        }

        console.log(languageList);
        return languageList;
    }

}

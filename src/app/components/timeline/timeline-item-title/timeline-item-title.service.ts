import {Injectable} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";
import {TickerService} from "../../../services/ticker.service";

@Injectable()
export class TimelineTitleService {
    private _observer: Observer<string>;
    private originalValue:string;
    private interval:number;
    private alphabet:string = "abcdefghijklmnopqrstuvwxyz";
    private numbers:string = "01234567890";
    private isEven:boolean;
    private title:string;
    private numCharsToKeep:number;

    constructor(private ticker:TickerService) {}

    private data$: Observable<string> = new Observable((observer) => {
        this._observer = observer;
    }).share();

    public subscribe(initial:string, isEven:boolean, handler:(value: string) => void):Subscription {
        this.originalValue = initial;
        this.isEven = isEven;

        return this.data$.subscribe(handler);
    }

    private getRandomNumber():string {
        return this.numbers.charAt(Math.floor(Math.random() * this.numbers.length));
    }

    private getRandomLetter():string {
        return this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
    }

    private getRandomChar(char:string):string {
        let c:string = char;
        if(this.alphabet.indexOf(char) > -1) {
            while(c === char) {
                c = this.getRandomLetter();
            }
            return c;
        }

        if(this.numbers.indexOf(char) > -1) {
            while(c === char) {
                c = this.getRandomNumber();
            }
            return c;
        }

        return char;
    }

    private scramble(t:string):string {
        let letters:string[] = t.split("");

        for (let i = 0; i < letters.length; i++) {
            letters[i] = this.getRandomChar(letters[i]);
        }

        return letters.join("");
    }

    private descrambleFromRight(title:string, charsToKeep:number):string {
        let letters:string[] = title.split("");

        for(let i = letters.length - 1; i > letters.length - charsToKeep - 1; i--) {
            letters[i] = this.title.charAt(i);
        }

        return letters.join("");
    }

    private descrambleFromLeft(title:string, charsToKeep:number):string {
        let letters:string[] = title.split("");

        for(let i = 0; i < charsToKeep; i++) {
            letters[i] = this.title.charAt(i);
        }

        return letters.join("");
    }

    private onTick() {
        let t = this.scramble(this.title);

        if(this.isEven) {
            t = this.descrambleFromLeft(t, this.numCharsToKeep);
        }
        else {
            t = this.descrambleFromRight(t, this.numCharsToKeep);
        }

        this._observer.next(t);

        this.numCharsToKeep++;

        if(this.numCharsToKeep > t.length) {
            this.ticker.stop(this.interval);
        }
    }

    public setTitle(t:string, ms:number = 30) {
        if(!this._observer) {
            return;
        }

        t = t.toLowerCase();

        if(this.interval) {
            this.ticker.stop(this.interval);
        }

        this.title = t;
        this.numCharsToKeep = 0;

        this.interval = this.ticker.start(ms, () => {
            this.onTick();
        });
    }

    public reset():void {
        this.setTitle(this.originalValue);
    }
}

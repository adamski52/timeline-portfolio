import {Injectable} from '@angular/core';
import {Observer, Observable} from 'rxjs';
import {IError} from "../interfaces/error";

@Injectable()
export class ErrorService {

    private _id:number = new Date().getTime();
    private _errors:IError[] = [];

    private _observer:Observer<IError[]>;
    public data$:Observable<IError[]> = new Observable(observer => this._observer = observer).share();

    private broadcast():void {
        if (this._observer) {
            this._observer.next(this._errors);
        }
    }

    public getByType(type:number):IError[] {
        return this._errors.filter((error) => {
            return error.type === type;
        });
    }

    public getById(id:number):IError {
        return this._errors.find((error) => {
            return error.id === id;
        });
    }

    public getAll():IError[] {
        return this._errors;
    }

    public add(description:string, type:number):IError {
        let error:IError = {
            description: description,
            type: type,
            id: this._id++
        };

        this._errors.push(error);
        this.broadcast();
        return error;
    }

    public remove(error:IError):void {
        let index:number = this._errors.indexOf(error);
        if (index <= -1) {
            return;
        }

        this._errors.splice(index, 1);
        this.broadcast();
    }

    public removeAll():void {
        if (this._errors.length <= 0) {
            return;
        }

        this._errors = [];
        this.broadcast();
    }
}

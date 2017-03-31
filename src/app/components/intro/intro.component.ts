import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jna-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  private _transitionMs:number = 200;
  private _index:number = 0;
  private _colors:string[] = ["#fc0", "#f0c", "#c0f", "#cc0", "#0fc", "#0cf"];

  constructor() { }

  getStyle() {
    return {
      "-webkit-transition": "all " + this._transitionMs/1000 + "s",
      "transition": "all " + this._transitionMs/1000 + "s",
      "background": this._colors[this._index]
    };
  }

  private getIndex():number {
    return Math.floor(Math.random() * this._colors.length);
  }

  ngOnInit() {
    this._index = this.getIndex();
    let timer = setInterval(() => {
      this._index = this.getIndex();
    }, this._transitionMs);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jna-intro',
  templateUrl: './intro.component.html'
})
export class IntroComponent implements OnInit {

  private _transitionMs:number = 10000;
  private _index:number = 0;
  private _colors:string[] = ["#9f015e", "#7f019f", "#015a9f", "#008c7a", "#147c00", "#ac4900"];

  constructor() { }

  getStyle() {
    return {
      "-webkit-transition": "all " + this._transitionMs/1000 + "s",
      "transition": "all " + this._transitionMs/1000 + "s",
      "background": this._colors[this._index]
    };
  }

  private getIndex():number {
    let i:number = this._index;
    while(i === this._index) {
      i = Math.floor(Math.random() * this._colors.length);
    }
    return i;
  }

  ngOnInit() {
    this._index = this.getIndex();
    setInterval(() => {
      this._index = this.getIndex();
    }, this._transitionMs);
  }
}

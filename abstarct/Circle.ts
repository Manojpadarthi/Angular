import { Shape } from "./Shape";

export class Circle extends Shape{
    
    calculateArea(): number {
        return Math.PI*Math.pow(this._radius,2);
    }
    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }

    constructor(theX:number,theY:number,private _radius: number){
        super(theX,theY);
    }

    getInfo():string{
        return `x=${this.x} , y=${this.y} , radius=${this._radius}`;
    }
}
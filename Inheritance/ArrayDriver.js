"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
var myCircle = new Circle_1.Circle(5, 7, 9);
//console.log("The Circle output is "+ myCircle.getInfo());
var myRectangle = new Rectangle_1.Rectangle(1, 2, 3, 4);
//console.log(`The Rectangle output is ${myRectangle.getInfo()}`);
var shapes = [];
shapes.push(myCircle);
shapes.push(myRectangle);
for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
    var myshape = shapes_1[_i];
    console.log(myshape.getInfo());
}

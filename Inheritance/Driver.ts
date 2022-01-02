import {Circle} from "./Circle";
import {Rectangle} from "./Rectangle";

let myCircle = new Circle(5,7,9);
    console.log("The Circle output is "+ myCircle.getInfo());
    
    let myRectangle = new Rectangle(1,2,3,4);
    console.log(`The Rectangle output is ${myRectangle.getInfo()}`);
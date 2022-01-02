import {Circle} from "./Circle";
import {Rectangle} from "./Rectangle";
import {Shape} from './Shape';
let myCircle = new Circle(5,7,9);
    
    
    let myRectangle = new Rectangle(1,2,3,4);
    
    let shapes : Shape[]=[];
    shapes.push(myCircle);
    shapes.push(myRectangle);

    for(let myshape of shapes)
    {
        console.log(`Info is ${myshape.getInfo()}`);
        console.log(`Area is ${myshape.calculateArea()}`);
        console.log();
    }

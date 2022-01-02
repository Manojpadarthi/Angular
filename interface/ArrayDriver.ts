import {CricketCoach} from "./CricketCoach";
import {HockeyCoach} from "./HockeyCoach";
import {Coach} from "./Coach";
let myCoach1 = new CricketCoach();
let myCoach2=new HockeyCoach();

let coaches : Coach[]=[];
coaches.push(myCoach1);
coaches.push(myCoach2);

for(let coach of coaches){
    console.log(`Info from coach is ${coach.getInfoFromCoach()}`);
    console.log();
    
}



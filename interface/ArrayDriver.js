"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CricketCoach_1 = require("./CricketCoach");
var HockeyCoach_1 = require("./HockeyCoach");
var myCoach1 = new CricketCoach_1.CricketCoach();
var myCoach2 = new HockeyCoach_1.HockeyCoach();
var coaches = [];
coaches.push(myCoach1);
coaches.push(myCoach2);
for (var _i = 0, coaches_1 = coaches; _i < coaches_1.length; _i++) {
    var coach = coaches_1[_i];
    console.log("Info from coach is " + coach.getInfoFromCoach());
    console.log();
}

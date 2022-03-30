console.log("Welcome to angular");
var firstName = "Manoj Kumar";
var lastName = "Padarthi";
console.log("Hi ".concat(firstName, " ").concat(lastName)); //template string
var marks = [5, 10, 6, 7];
for (var i = 0; i < marks.length; i++) {
    console.log("marks obtained by ".concat(i, " student is ").concat(marks[i]));
}
for (var _i = 0, marks_1 = marks; _i < marks_1.length; _i++) {
    var i = marks_1[_i];
    console.log(i);
}

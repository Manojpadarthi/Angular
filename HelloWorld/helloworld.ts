console.log("Welcome to angular");

let firstName:string="Manoj Kumar";
let lastName:string="Padarthi";
console.log(`Hi ${firstName} ${lastName}`);//template string

let marks : number[] = [5,10,6,7];
for (let i =0;i<marks.length;i++){
    console.log(`marks obtained by ${i} student is ${marks[i]}`);
}
for(let i of marks){
    console.log(i);
}

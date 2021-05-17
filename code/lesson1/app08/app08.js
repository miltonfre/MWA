const child_process=require("child_process");
console.log("1: Start");

const newProcess=child_process.spawn("node",["lesson1/app08/computation/_fibonacci.js"],{stdio:'inherit'});

console.log("2: end");
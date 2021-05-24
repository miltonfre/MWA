const fs=require('fs');
console.log('1:Get a file');
fs.readFileSync("text.txt",function(err,file){
console.log(err);
console.log(file);
});
console.log("3: app continues");
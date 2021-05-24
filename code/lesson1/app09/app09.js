const express=require("express");
const app=express();
const server=app.listen(3000,function(){
    console.log('Listening port 3000');
});
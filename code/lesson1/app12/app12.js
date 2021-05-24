const express=require("express");
const app=express();
const path=require("path");
app.set("port",3000);
app.use(express.static(path.join(__dirname,"public")))
// app.get("/",function(req,res){
//     console.log("GET homepage");
//     req.status(200).sendFile(path.join(__dirname,"public","index.html"));
// });
const server=app.listen(app.get("port"),function(){
    const port=server.address().port;
    console.log("listeting to port "+port);
})
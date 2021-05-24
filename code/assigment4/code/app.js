require("./data/db");
const express = require("express");
const app = express();
const router = require("./router");

app.set("port", 3001);
app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});
app.use("/api", router)

const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log("listenning port: " + port);
});
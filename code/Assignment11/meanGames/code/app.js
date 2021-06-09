require("./api/data/db");
const express = require("express");
const app = express();
const router = require("./api/router");
const path=require("path");


app.set("port", 3006);
app.use(express.static(path.join(__dirname,"public")));
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));
app.use(express.json());

app.use("/api",function (req, res, next) {
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers","X-Requested-With,Content-Type,Authorization");
    next();
});
app.use("/api", router);


app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log("listennig port " + port);
});
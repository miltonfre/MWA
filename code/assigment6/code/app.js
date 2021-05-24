require("./api/data/db");
const express = require("express");
const app = express();
const router = require("./api/router");


app.set("port", 3006);

app.use(express.json());
app.use("/api", router);



app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log("listennig port " + port);
});
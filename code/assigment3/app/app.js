const express = require("express");
const router = require("./routes");
require("./data/dbConnection").open();
const app = express();
app.set('port', 5000);
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/api", router);
const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log("listening to port:" + port);
});


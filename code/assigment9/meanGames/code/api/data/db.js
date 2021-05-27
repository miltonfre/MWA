const mongoose=require("mongoose");
require("./model/games-model");

const dbName="dbGames";
const dbUrl='mongodb://localhost:27017/'+dbName;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
process.on("SIGINT", function () {
    console.log("mongoose disconnected by app interrupted SIGINT");
    process.exit(0);
});
process.on("SIGTERM", function () {
    console.log("mongoose disconnected by app termination SIGTERM");
    process.exit(0);
});
process.once("SIGUSR2", function () {
    console.log("mongoose disconnected by app restarted SIGUSR2");
    process.kill(process.pid);
});
mongoose.connection.on("connected", function () {
    console.log("mongoose connected to " + dbUrl);
});

mongoose.connection.on("disconnected", function () {
    console.log("mongoose disconnected");
});

mongoose.connection.on("error", function (err) {
    console.log("mongoose error",err);
});


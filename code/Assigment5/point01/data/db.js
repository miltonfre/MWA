const mongoose=require("mongoose");
require("./models/games-model");

const dbName="dbGames";
const dbUrl='mongodb://localhost:27017/'+dbName;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
process.once("SIGINT", function () {
    console.log("mongoose disconnected by app termination SIGINT");
    process.exit(0);
});
process.once("SIGTERM", function () {
    console.log("mongoose disconnected by app termination SIGTERM");
    process.exit(0);
});
process.once("SIGUSR2", function () {
    console.log("mongoose disconnected by app termination SIGUSR2");
    process.exit(0);
});
mongoose.connection.on("connected", function () {
    console.log("mongoose connected to " + dbUrl);
});

mongoose.connection.on("disconnected", function () {
    console.log("mongoose disconnected");
});

mongoose.connection.on("error", function () {
    console.log("mongoose error");
});


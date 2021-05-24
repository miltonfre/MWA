const MongoClient = require("mongodb").MongoClient;
const dbName = "dbGames";
const dbUrl = 'mongodb://localhost:27017/' + dbName;
var _connection = null;
const open = function () {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, function (err, client) {
        if (err) {
            console.log("DB connection failed: " + err);
            return;
        }
        _connection = client.db(dbName);
        console.log("DB connection open:", _connection);
    })
};


const get=function(){
    return _connection;
}
module.exports={
    open:open,
    get:get
}
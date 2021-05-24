module.exports.getAll = function (req, res) {
    const dbConnection = require("../data/dbConnection");
    let offset = 0;
    let count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > 7) {
            count = 7;
        }
    }
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    gamesCollection.find().skip(offset).limit(count).toArray(function (err, data) {
        if (err) {
            console.log("request data failed from get", err);
            res.status(400).json({ "error": "request data failed from get", "message": err });
        }
        else {
            console.log("Found games", data);
            res.status(200).json(data);
        }
    })
}
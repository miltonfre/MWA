const mongoose = require("mongoose");
const Game = mongoose.model("Game");
let response = require("../common/response");

module.exports.publisherGet = function (req, res) {
    const gameId = req.params.gameId;

    Game.findById(gameId).select("publisher").exec(function (err, games) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = games;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.publisherAdd = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Adding publisher to a game ID: " + gameId);
    Game.findByIdAndUpdate(gameId, {
        publisher:
        {
            name: req.body.name,
            country: req.body.country
        }
    }).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = game;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherUpdate = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Updating publisher to a game ID: " + gameId);

    Game.findByIdAndUpdate(gameId, {
        publisher:
        {
            name : req.body.name,
            country: req.body.country
        }
    }).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = game;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherDelete = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Deleting publisher for GameId: " + gameId);
    Game.findByIdAndUpdate(gameId, { publisher: {} }).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            if (!game) {
                response.status = 404;
                response.message = "Game ID not found";
            } else {
                response.status = 200;
                response.message = "Publisher deleted";
            }
        }
        res.status(response.status).json(response.message);
    });
}


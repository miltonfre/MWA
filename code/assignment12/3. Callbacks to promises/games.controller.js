const mongoose = require("mongoose");
const Game = mongoose.model("Game");
let response = require("../common/response");

module.exports.gamesGetAll = function (req, res) {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (isNaN(offset) || isNaN(count)) {
        response.status = 400;
        response.message = "QueryString Offset and Count should be numbers";
        res.status(response.status).json(response.message);
        return;
    }
    Game.find().skip(offset).limit(count).then(games => {
        response.status = 200;
        response.message = games;
        res.status(response.status).json(response.message);
    }).catch(err => {
        response.status = 500;
        response.message = err;
        res.status(response.status).json(response.message);
    });

}

module.exports.gamesGetOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Getting info for game: " + gameId);

    Game.findById(gameId).then(game => {
        if (!game) {
            response.status = 404;
            response.message = "Game ID not found";
        } else {
            response.status = 200;
            response.message = game;
        }
        res.status(response.status).json(response.message);
    }).catch(err => {
        response.status = 500;
        response.message = err;
        res.status(response.status).json(response.message);
    });
}

module.exports.gamesAddOne = function (req, res) {
    console.log("Creating a new game");
    if (req.body && req.body.title && req.body.price && req.body.rate) {
        let newGame = {};
        newGame.title = req.body.title;
        newGame.price = req.body.price;
        newGame.rate = req.body.rate;
        Game.create(newGame, function (err, game) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            else {
                response.status = 201;
                response.message = game;
            }
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 404;
        response.message = "Title, price and rate are required";
        res.status(response.status).json(response.message);
    }
}

module.exports.gamesUpdateOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Getting info for game: " + gameId);

    let newGame = {};
    newGame.title = req.body.title;
    newGame.year = parseInt(req.body.year);
    newGame.price = parseFloat(req.body.price);
    newGame.designer = req.body.designer;
    newGame.minPlayers = parseInt(req.body.minPlayers);
    newGame.maxPlayers = parseInt(req.body.maxPlayers);
    newGame.rate = parseFloat(req.body.rate);
    newGame.minAge = parseInt(req.body.minAge);


    Game.findByIdAndUpdate(gameId, newGame).exec(function (err, game) {
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
                response.message = game;
            }
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.gamesDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Deleting game: " + gameId);

    Game.findByIdAndDelete(gameId).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {

            response.status = 204;
            response.message = "Game deleted";
        }
        res.status(response.status).json(response.message);
    });
}
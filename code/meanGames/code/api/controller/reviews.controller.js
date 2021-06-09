const mongoose = require("mongoose");
const Game = mongoose.model("Game");
let response = require("../common/response");

module.exports.reviewsGetAll = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Getting reviews  for game: " + gameId);
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = game.reviews;
            console.log(game.reviews);
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewsGetOne = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("Getting review: " + reviewId);
     Game.findById(gameId).exec(function (err, game) {
        console.log(game);
         const review = game.reviews.id(reviewId);
         res.status(200).json(review);
     });
}

module.exports.reviewsAdd = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Adding reviews to a game ID: " + gameId);
    const reviewId = new mongoose.Types.ObjectId();
    Game.findByIdAndUpdate(gameId, {
        $push: {
            reviews:
            {
                _id: reviewId,
                name: req.body.name,
                review: req.body.review,
                date: req.body.date
            }
        }
    }).exec(function (err, game) {
        if (err) {
            console.log(err);
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

module.exports.reviewUpdate = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("Updating review: " + reviewId);
    Game.findById(gameId,function(err,game){
        game.reviews.id(reviewId).name=req.body.name;
        game.reviews.id(reviewId).review=req.body.review;
        game.reviews.id(reviewId).date=req.body.date;

        game.save();
        res.status(200).json(game);
    });
}

module.exports.reviewsDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;


    console.log("Deleting reviews for GameId: " + gameId);
    Game.findByIdAndUpdate(gameId, {
        $pull: {
            reviews: { '_id': reviewId }
        }
    }).exec(function (err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            if (!game) {
                response.status = 404;
                response.message = "Game ID not found";
            } else {
                response.status = 204;
                response.message = "reviews deleted";
            }
        }
        res.status(response.status).json(response.message);
    });
}


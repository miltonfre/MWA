const express = require("express");
const router = express.Router();
const gameController = require("../controller/games.controller");

router.route("/games")
    .get(gameController.gamesGetAll)
    .post(gameController.gamesAddOne);

router.route("/games/:gameId")
    .get(gameController.gamesGetOne)
    .put(gameController.gamesUpdateOne)
    .delete(gameController.gamesDeleteOne);

    module.exports=router;
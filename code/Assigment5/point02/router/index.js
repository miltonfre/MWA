const express = require("express");
const router = express.Router();
const gameController = require("../controller/games.controller");
const publisherController = require("../controller/publisher.controller");

router.route("/games")
    .get(gameController.gamesGetAll)
    .post(gameController.gamesAddOne);

router.route("/games/:gameId")
    .get(gameController.gamesGetOne)
    .put(gameController.gamesUpdateOne)
    .delete(gameController.gamesDeleteOne);


router.route("/games/:gameId/publisher/")
    .get(publisherController.publisherGet)
    .post(publisherController.publisherAdd)
    .put(publisherController.publisherUpdate)
    .delete(publisherController.publisherDelete);

module.exports = router;
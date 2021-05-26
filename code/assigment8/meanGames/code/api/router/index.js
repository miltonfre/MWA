const express = require("express");
const router = express.Router();
const gameController = require("../controller/games.controller");
const publisherController = require("../controller/publisher.controller");
const reviewsController = require("../controller/reviews.controller");

//api/cars (GET) ==> return all cars
//api/cars (POST) ==> create a new car
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

    router.route("/games/:gameId/reviews/")
    .get(reviewsController.reviewsGetAll)
    .post(reviewsController.reviewsAdd);

    router.route("/games/:gameId/reviews/:reviewId")
    .get(reviewsController.reviewsGetOne)
    .put(reviewsController.reviewUpdate)
    .delete(reviewsController.reviewsDeleteOne);

module.exports = router;
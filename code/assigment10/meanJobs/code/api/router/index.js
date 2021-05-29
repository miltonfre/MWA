const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");
const locationController = require("../controller/location.controller");

router.route("/Jobs")
    .get(jobController.jobGetAll)
    .post(jobController.jobAddOne);

router.route("/Jobs/:jobId")
    .get(jobController.jobGetOne)
    .put(jobController.jobUpdateOne)
    .delete(jobController.jobDeleteOne);

router.route("/Jobs/:jobId/location")
    .get(locationController.locationGet)
    .post(locationController.locationAdd) 
    .put(locationController.locationUpdate)
    .delete(locationController.locationDelete);

// router.route("/Jobs/:jobId/location/:locationId")
//     .put(locationController.locationUpdate)
//     .delete(locationController.locationDelete);

module.exports = router;
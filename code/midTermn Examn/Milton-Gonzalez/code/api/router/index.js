const express = require("express");
const router = express.Router();
const laureateController = require("../controller/laureate.controller");

router.route("/laureates")
    .get(laureateController.laureateGetAll)
    .post(laureateController.laureateAddOne);

    router.route("/laureates/search")
    .get(laureateController.laureateSearchbyCountryBirth);

router.route("/laureates/:laureateId")
    .get(laureateController.laureateGetOne)
    .put(laureateController.laureateUpdateOne)
    .delete(laureateController.laureateDeleteOne);


module.exports = router;
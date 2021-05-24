const express = require("express");
const router = express.Router();
const operations = require("../controllers/operations.controller");
router.route("/sum/:num1").get(operations.sum);
module.exports = router;
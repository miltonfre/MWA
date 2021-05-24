const express = require("express");
const router = express.Router();
const studentsController = require("../controller/students.controller");
const addressController = require("../controller/address.controller");

router.route("/students")
    .get(studentsController.StudentsGetAll)
    .post(studentsController.StudentsAddOne);

router.route("/students/:studentId")
    .get(studentsController.StudentsGetOne)
    .put(studentsController.StudentsUpdateOne)
    .delete(studentsController.StudentsDeleteOne);

router.route("/students/:studentId/address/")
    .get(addressController.addressGetAll)
    .post(addressController.addressAdd);

router.route("/students/:studentId/address/:addressId")
    .get(addressController.addressGetOne)
    .put(addressController.addressUpdate)
    .delete(addressController.addressDeleteOne);

module.exports = router;
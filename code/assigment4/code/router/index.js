const express=require("express");
const router=express.Router();
const studentsController=require("../controllers/students.controller");
const addressController=require("../controllers/address.controller");

router.route("/students").get(studentsController.stundentGetAll);
router.route("/students/:studentId").get(studentsController.stundentGetOne);
router.route("/students/:studentId/address/").get(addressController.addressGetAll);
router.route("/students/:studentId/address/:zipCode").get(addressController.addressGetOne);
module.exports=router;
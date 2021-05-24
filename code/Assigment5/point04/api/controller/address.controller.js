const mongoose = require("mongoose");
const Student = mongoose.model("Student");
let response = require("../common/response");


module.exports.addressGetAll = function (req, res) {
    console.log("getting all addresses");
    const studentId = req.params.studentId;
    Student.findById(studentId).select("address").exec(function (err, addresses) {
        if (err) {
            res.status(400).json({
                "Error": "Error getting student by Id",
                "Description": err
            });
        }
        else {
            res.status(200).json(addresses.address );
        }
    });
}

module.exports.addressGetOne = function (req, res) {
    const studentId = req.params.studentId;
    const addressId = req.params.addressId;
    console.log("Getting addressId: " + addressId);
    Student.findById(studentId).exec(function (err, student) {
        console.log(student);
        const review = student.address.id(addressId);
        res.status(200).json(review);
    });
}

module.exports.addressAdd = function (req, res) {
    const studentId = req.params.studentId;
    console.log("Adding addresss to a Student ID: " + studentId);
    const addressId = new mongoose.Types.ObjectId();
    Student.findByIdAndUpdate(studentId, {
        $push: {
            address:
            {
                _id: addressId,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode
            }
        }
    }).exec(function (err, Student) {
        if (err) {
            console.log(err);
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = Student;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.addressUpdate = function (req, res) {
    const studentId = req.params.studentId;
    const addressId = req.params.addressId;
    console.log("Updating address: " + addressId);
    Student.findById(studentId, function (err, student) {
        student.address.id(addressId).streetAddress = req.body.streetAddress;
        student.address.id(addressId).city = req.body.city;
        student.address.id(addressId).state = req.body.state;
        student.address.id(addressId).zipCode = req.body.zipCode;

        student.save();
        res.status(200).json(student);
    });
}

module.exports.addressDeleteOne = function (req, res) {
    const studentId = req.params.studentId;
    const addressId = req.params.addressId;


    console.log("Deleting Address for studentId: " + studentId);
    Student.findByIdAndUpdate(studentId, {
        $pull: {
            address: { '_id': addressId }
        }
    }).exec(function (err, student) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            if (!student) {
                response.status = 404;
                response.message = "Gstudent ID not found";
            } else {
                response.status = 204;
                response.message = "reviews deleted";
            }
        }
        res.status(response.status).json(response.message);
    });
}

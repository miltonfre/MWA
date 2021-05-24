const mongoose = require("mongoose");
const Student = mongoose.model("Student");
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
            const adds = addresses.address;
            res.status(200).json({ adds });
        }
    });
}

module.exports.addressGetOne = function (req, res) {
    console.log("getting one addresses");
    const studentId = req.params.studentId;
    const zipCode = req.params.zipCode;
    Student.findById(studentId).select("address").exec(function (err, addresses) {
        if (err) {
            res.status(400).json({
                "Error": "Error getting student by Id",
                "Description": err
            });
        }
        else {
            const adds = addresses.address;
            let address = adds.filter(x => x.zipCode == zipCode);
            console.log(result);
            res.status(200).json({ address });
        }
    });
}
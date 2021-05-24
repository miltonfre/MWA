const mongoose = require("mongoose");
const Student = mongoose.model("Student");
module.exports.stundentGetAll = function (req, res) {
    console.log("getting all students");
    let offset = 0;
    let count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > 7) {
            count = 7;
        }
    }
    Student.find().skip(offset).limit(count).exec(function (err, students) {
        if (err) {
            res.status(400).json({
                "Error": "Error getting all students",
                "Description": err
            });
        }
        else {
            res.status(200).json({
                students
            });
        }
    });

}

module.exports.stundentGetOne = function (req, res) {
    const studentId = req.params.studentId;
    console.log("Getting info for estudent: "+ studentId);
    
    Student.findById(studentId).exec(function(err,student){        
        if (err) {
            res.status(400).json({
                "Error": "Error getting student by Id",
                "Description": err
            });
        }
        else {
            res.status(200).json({
                student
            });
        }
    });
}
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
let response = require("../common/response");

module.exports.StudentsGetAll = function (req, res) {
    console.log("Getting all students");
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (isNaN(offset) || isNaN(count)) {
        response.status = 400;
        response.message = "QueryString Offset and Count should be numbers";
        res.status(response.status).json(response.message);
        return;
    }
    Student.find().skip(offset).limit(count).exec(function (err, Students) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = Students;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.StudentsGetOne = function (req, res) {
    const studentId = req.params.studentId;
    console.log("Getting info for Student: " + studentId);

    Student.findById(studentId).exec(function (err, Student) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            if (!Student) {
                response.status = 404;
                response.message = "Student ID not found";
            } else {
                response.status = 200;
                response.message = Student;
            }
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.StudentsAddOne = function (req, res) {
    console.log("Creating a new Student");
    if (req.body && req.body.name && req.body.gpa) {
        let newStudent = {};
        newStudent.name = req.body.name;
        newStudent.gpa = req.body.gpa;
        Student.create(newStudent, function (err, Student) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            else {
                response.status = 201;
                response.message = Student;
            }
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 404;
        response.message = "Name and gpa are required";
        res.status(response.status).json(response.message);
    }
}

module.exports.StudentsUpdateOne = function (req, res) {
    const studentId = req.params.studentId;
    console.log("Getting info for Student: " + studentId);

    let newStudent = {};
    newStudent.name = req.body.name;
    newStudent.gpa = req.body.gpa;


    Student.findByIdAndUpdate(studentId, newStudent).exec(function (err, Student) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            if (!Student) {
                response.status = 404;
                response.message = "Student ID not found";
            } else {
                response.status = 200;
                response.message = Student;
            }
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.StudentsDeleteOne = function (req, res) {
    const studentId = req.params.studentId;
    console.log("Deleting Student: " + studentId);

    Student.findByIdAndDelete(studentId).exec(function (err, Student) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {

            response.status = 204;
            response.message = "Student deleted";
        }
        res.status(response.status).json(response.message);
    });
}
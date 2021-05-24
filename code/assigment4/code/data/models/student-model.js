const mongoose = require("mongoose");
const addressSchema = require("./address-model");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    gpa: {
        type: Number,
        require: true
    },
    address: [addressSchema]
});

mongoose.model("Student", studentSchema, "Students");
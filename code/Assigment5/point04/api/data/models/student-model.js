const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String
}); 
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
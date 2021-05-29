const mongoose = require("mongoose");
const locationSchema=require("./location-model");


const reviewSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
});

const jobSchema = new mongoose.Schema({
    title: { type: String, require: true },
    salary: Number,
    description: { type: String, require: true },
    location: locationSchema,
    experience: String,
    skills: [String],
    posDate: { type: Date, require: true },
    reviews: [reviewSchema]
});

mongoose.model("Job", jobSchema, "jobs");
const mongoose = require("mongoose");


const laureateSchema = new mongoose.Schema({
    id: Number,
    firstname: String,
    surname:String,
    born: Date,
    died: Date,
    bornCountry: String,
    bornCountryCode: String,
    bornCity: String,
    diedCountry: String,
    diedCountryCode: String,
    diedCity: String,
    gender: String,
    year: String,
    category: String,
    motivation: String,
    affiliation: String,
});

mongoose.model("Laureate", laureateSchema, "laureates");
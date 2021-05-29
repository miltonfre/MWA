const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
    streetAddress: { type: String, require: true },
    city: String,
    state: String,
    zipCode: String
});

module.exports.locationSchema;
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String
});

//mongoose.model("Address", addressSchema, "address")
module.exports.addressSchema;
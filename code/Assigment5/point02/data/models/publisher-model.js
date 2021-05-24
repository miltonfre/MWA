const mongoose = require("mongoose");
const publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country:  {
        type: String,
        required: true
    }
});

module.exports.publisherSchema;
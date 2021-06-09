const mongoose = require("mongoose");
const publisherSchema = require("./publisher-model");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review:  {
        type: String,
        required: true
    }
    ,
    date:  {
        type: Date
    }
});

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    designers: [String],
    players: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    publisher:publisherSchema,
    reviews:[reviewSchema]
});

mongoose.model("Game", gameSchema, "games");
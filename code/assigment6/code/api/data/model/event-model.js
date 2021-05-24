const mongoose = require("mongoose");


const bandSchema = new mongoose.Schema({
    name: { type: String, require: true },
    genre: { type: String, require: true },
    mainSong: String
});

const eventSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: String,
    urlPicture: String,
    date: { type: String, require: true },
    band: [bandSchema]
});

mongoose.model("Event", eventSchema, "events");
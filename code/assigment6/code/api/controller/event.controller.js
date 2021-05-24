const mongoose = require("mongoose");
const Event = mongoose.model("Event");
let response = require("../common/response");



module.exports.eventGetAll = function (req, res) {
    console.log("getting all events");
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "QueryString Offset and Count should be numbers" });
        return;
    }


    Event.find().skip(offset).limit(count).exec(function (err, events) {
        if (err) {
            console.log("error getting all events", err);
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = events;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.eventGetOne = function (req, res) {
    const eventId = req.params.eventId;
    console.log("getting one event " + eventId);
    Event.findById(eventId).exec(function (err, event) {
        if (err) {
            console.log("error getting one event", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (event) {
                response.status = 200;
                response.message = event;
            } else {
                response.status = 204;
                response.message = "Event Id doesn't found";
            }

        }
        res.status(response.status).json(response.message);
    });
}

module.exports.eventAddOne = function (req, res) {
    console.log("adding one event");
    let newGame = {};
    if (req.body && req.body.title && req.body.date) {

        
        newGame.title = req.body.title;
        newGame.description = req.body.description;
        newGame.urlPicture = req.body.urlPicture;
        newGame.date = req.body.date;
        newGame.place = req.body.place;
        Event.create(newGame, function (err, eventAdded) {
            if (err) {
                console.log("error adding one event", err);
                response.status = 400;
                response.message = err;
            }
            else {
                response.status = 201;
                response.message = eventAdded;
            }
            res.status(response.status).json(response.message);
        })
   
    }
    else {
        response.status = 400;
        response.message = "event title and date are required";
        res.status(response.status).json(response.message);
    }
}

module.exports.eventUpdateOne = function (req, res) {
    const eventId = req.params.eventId;
    console.log("updating one event" + eventId);
    let newGame = {};
    Event.findById(eventId).exec(function (err, event) {
        if (err) {
            console.log("error getting one event for update it", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (event) {
                if (req.body && req.body.title && req.body.date) {
                    newGame.title = req.body.title;
                    newGame.description = req.body.description;
                    newGame.urlPicture = req.body.urlPicture;
                    newGame.date = req.body.date;
                    newGame.place = req.body.place;

                    Event.findByIdAndUpdate(eventId, newGame).exec(function (err, eventUpdated) {
                        if (err) {
                            console.log("error adding one event", err);
                            response.status = 400;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = eventUpdated;
                        }
                        res.status(response.status).json(response.message);
                    });
                }
                else {
                    response.status = 400;
                    response.message = "event title and date are required";
                    res.status(response.status).json(response.message);
                }
            } else {
                response.status = 204;
                response.message = "Event Id doesn't found";
                res.status(response.status).json(response.message);
            }
        }
    });
}

module.exports.eventDeleteOne = function (req, res) {
    const eventId = req.params.eventId;
    console.log("deleting one event");
    Event.findById(eventId).exec(function (err, event) {
        if (err) {
            console.log("error getting one event for update it", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (event) {
                Event.findByIdAndDelete(eventId, function (err) {
                    if (err) {
                        console.log("error updating one event", err);
                        response.status = 400;
                        response.message = err;
                    }
                    else {
                        response.status = 200;
                        response.message = "event deleted";
                    }
                    res.status(response.status).json(response.message);
                });
            }
            else {
                response.status = 204;
                response.message = "Event Id doesn't found";
                
                res.status(response.status).json(response.message);
            }
        }
    });
}
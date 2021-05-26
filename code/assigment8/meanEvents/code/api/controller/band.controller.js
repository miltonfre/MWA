const mongoose = require("mongoose");
const Event = mongoose.model("Event");
let response = require("../common/response");

module.exports.bandGetAll = function (req, res) {
    const eventId = req.params.eventId;
    Event.findById(eventId).select("band").exec(function (err, event) {
        if (err) {
            console.log("error getting all bands", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (event) {
                response.status = 200;
                response.message = event.band;
            } else {
                response.status = 400;
                response.message = "Event Id doesn´t exist";
            }
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.bandGetOne = function (req, res) {
    const eventId = req.params.eventId;
    const bandId = req.params.bandId;

    Event.findById(eventId).select("band").exec(function (err, event) {
        if (err) {
            console.log("error getting all bands", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (event) {
                if(event.band.id(bandId))
                {
                    response.status = 200;
                    response.message = event.band.id(bandId);
                }else{
                    response.status = 200;
                    response.message = "band does not exist";
                }
                
            } else {
                response.status = 400;
                response.message = "Event Id doesn´t exist";
            }
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.bandAddOne = function (req, res) {
    console.log("adding one band");
    const eventId = req.params.eventId;
    let newBand = {};
    //newBand.id=  new mongoose.Types.ObjectId();
    if (req.body && req.body.name && req.body.genre) {
        newBand.name = req.body.name;
        newBand.genre = req.body.genre;
        newBand.mainSong = req.body.mainSong;
        Event.findById(eventId, function (err, event) {
            if (err) {
                console.log("error updating band- Consulting event Id", err);
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
            }
            else {
                if (event) {
                    Event.findByIdAndUpdate(eventId, {
                        $push: {
                            band:
                            {
                                //_id: reviewId,
                                name: req.body.name,
                                genre: req.body.genre,
                                mainSong: req.body.mainSong
                            }
                        }
                    }).exec(function (err, event) {
                        if (err) {
                            console.log(err);
                            response.status = 500;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = event;
                        }
                        res.status(response.status).json(response.message);
                    });
                } else {
                    response.status = 400;
                    response.message = "Event Id doesn´t exist";
                    res.status(response.status).json(response.message);
                }
            }
        });
    } else {
        response.status = 400;
        response.message = "Band name and genre are required";
        res.status(response.status).json(response.message);
    }
}

module.exports.bandUpdateOne = function (req, res) {
    const eventId = req.params.eventId;
    const bandId = req.params.bandId;
    console.log("Updating band: " + bandId);
    if (req.body && req.body.name && req.body.genre) {
        Event.findById(eventId, function (err, event) {
            if (err) {
                console.log("error updating band- Consulting event Id", err);
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
            }
            else {
                if (event) {
                    if (event.band.id(bandId)) {
                        event.band.id(bandId).name = req.body.name;
                        event.band.id(bandId).genre = req.body.genre;
                        event.band.id(bandId).mainSong = req.body.mainSong;

                        event.save(function (errSaving, eventUpdated) {
                            if (errSaving) {
                                console.log("error updating band- saving band", err);
                                response.status = 500;
                                response.message = err;
                            } else {
                                response.status = 200;
                                response.message = eventUpdated.band.id(bandId);
                            }
                            res.status(response.status).json(response.message);
                        });
                    } else {
                        response.status = 400;
                        response.message = "Band Id doesn´t exist";
                        res.status(response.status).json(response.message);
                    }
                }
                else {
                    response.status = 400;
                    response.message = "Event Id doesn´t exist";
                    res.status(response.status).json(response.message);
                }
            }
        });
    } else {
        response.status = 400;
        response.message = "Band name and genre are required";
        res.status(response.status).json(response.message);
    }
}

module.exports.bandDeleteOne = function (req, res) {
    console.log("deleting one band");
    const eventId = req.params.eventId;
    const bandId = req.params.bandId;
    Event.findById(eventId).select("band").exec(function (err, event) {
        if (err) {
            console.log("error getting evento for delete a band", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (event) {
                Event.findByIdAndUpdate(eventId, {
                    $pull: {
                        band: { '_id': bandId }
                    }
                }).exec(function (err, event) {
                    if (err) {
                        console.log("error deleting a band", err);
                        response.status = 500;
                        response.message = err;
                    } else {
                        response.status = "200";
                        response.message = "Band deleted";
                    }
                    res.status(response.status).json(response.message);
                });
            }
            else {
                response.status = 400;
                response.message = "Event Id doesn´t exist";
                res.status(response.status).json(response.message);
            }
        }
    });
}
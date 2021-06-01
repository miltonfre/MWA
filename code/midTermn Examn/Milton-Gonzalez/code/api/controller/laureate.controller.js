const mongoose = require("mongoose");
const Laureate = mongoose.model("Laureate");
let response = require("../common/response");



module.exports.laureateGetAll = function (req, res) {
    console.log("getting all laureates");
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
    Laureate.find().skip(offset * count).limit(count).select("firstname surname year").exec(function (err, laureates) {
        if (err) {
            console.log("error getting all laureates", err);
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = laureates;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.laureateSearchbyCountryBirth = function (req, res) {
    console.log("getting all laureates by search" + req.query.search);
    let offset = 0;
    let count = 5;
    let search = req.query.search;
    if (req.query && req.query.search) {
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
        Laureate.find(({ bornCountry: { $regex: search, $options: 'i' } })).skip(offset * count).limit(count).select("firstname surname year").exec(function (err, laureates) {
            if (err) {
                console.log("error getting all laureates", err);
                response.status = 500;
                response.message = err;
            }
            else {
                response.status = 200;
                response.message = laureates;
            }
            res.status(response.status).json(response.message);
        });
    }else{
        Laureate.find().skip(offset * count).limit(count).select("firstname surname year").exec(function (err, laureates) {
            if (err) {
                console.log("error getting all laureates", err);
                response.status = 500;
                response.message = err;
            }
            else {
                response.status = 200;
                response.message = laureates;
            }
            res.status(response.status).json(response.message);
        });
    }

}

module.exports.laureateGetOne = function (req, res) {
    const laureateId = req.params.laureateId;
    console.log("getting one laureate " + laureateId);
    Laureate.findById(laureateId).exec(function (err, laureate) {
        if (err) {
            console.log("error getting one laureate", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (laureate) {
                response.status = 200;
                response.message = laureate;
            } else {
                response.status = 204;
                response.message = "laureate Id doesn't found";
            }

        }
        res.status(response.status).json(response.message);
    });
}

module.exports.laureateAddOne = function (req, res) {
    console.log("adding one laureate");
    let newLaureate = {};
    if (req.body && req.body.firstname && req.body.year) {

        newLaureate.id = req.body.id;
        newLaureate.firstname = req.body.firstname;
        newLaureate.surname = req.body.surname;
        newLaureate.born = req.body.born;
        newLaureate.died = req.body.died;
        newLaureate.bornCountry = req.body.bornCountry;
        newLaureate.bornCountryCode = req.body.bornCountryCode;
        newLaureate.bornCity = req.body.bornCity;
        newLaureate.diedCountry = req.body.diedCountry;
        newLaureate.diedCountryCode = req.body.diedCountryCode;
        newLaureate.diedCity = req.body.diedCity;
        newLaureate.gender = req.body.gender;
        newLaureate.year = req.body.year;
        newLaureate.category = req.body.category;
        newLaureate.motivation = req.body.motivation;
        newLaureate.affiliation = req.body.affiliation;
        Laureate.create(newLaureate, function (err, laureateAdded) {
            if (err) {
                console.log("error adding one laureate", err);
                response.status = 400;
                response.message = err;
            }
            else {
                response.status = 201;
                response.message = laureateAdded;
            }
            res.status(response.status).json(response.message);
        })

    }
    else {
        response.status = 400;
        response.message = "firstName  and year are required";
        res.status(response.status).json(response.message);
    }
}

module.exports.laureateUpdateOne = function (req, res) {
    const laureateId = req.params.laureateId;
    console.log("updating one laureate" + laureateId);
    let laureateEdit = {};
    Laureate.findById(laureateId).exec(function (err, laureate) {
        if (err) {
            console.log("error getting one laureate for update it", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (laureate) {
                if (req.body && req.body.firstname && req.body.year) {
                    laureateEdit.id = req.body.id;
                    laureateEdit.firstname = req.body.firstname;
                    laureateEdit.surname = req.body.surname;
                    laureateEdit.born = req.body.born;
                    laureateEdit.died = req.body.died;
                    laureateEdit.bornCountry = req.body.bornCountry;
                    laureateEdit.bornCountryCode = req.body.bornCountryCode;
                    laureateEdit.bornCity = req.body.bornCity;
                    laureateEdit.diedCountry = req.body.diedCountry;
                    laureateEdit.diedCountryCode = req.body.diedCountryCode;
                    laureateEdit.diedCity = req.body.diedCity;
                    laureateEdit.gender = req.body.gender;
                    laureateEdit.year = req.body.year;
                    laureateEdit.category = req.body.category;
                    laureateEdit.motivation = req.body.motivation;
                    laureateEdit.affiliation = req.body.affiliation;
                    console.log(laureateEdit);
                    Laureate.findByIdAndUpdate(laureateId, laureateEdit).exec(function (err, laureateUpdated) {
                        if (err) {
                            console.log("error updating the laureate", err);
                            response.status = 400;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = laureateUpdated;
                        }
                        res.status(response.status).json(response.message);
                    });
                }
                else {
                    response.status = 400;
                    response.message = "firstName  and year are required";
                    res.status(response.status).json(response.message);
                }
            } else {
                response.status = 204;
                response.message = "laureate Id doesn't found";
                res.status(response.status).json(response.message);
            }
        }
    });
}

module.exports.laureateDeleteOne = function (req, res) {
    const laureateId = req.params.laureateId;
    console.log("deleting one laureate");
    Laureate.findById(laureateId).exec(function (err, laureate) {
        if (err) {
            console.log("error getting one laureate for update it", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (laureate) {
                Laureate.findByIdAndDelete(laureateId, function (err) {
                    if (err) {
                        console.log("error updating one laureate", err);
                        response.status = 400;
                        response.message = err;
                    }
                    else {
                        response.status = 200;
                        response.message = "laureate deleted";
                    }
                    res.status(response.status).json(response.message);
                });
            }
            else {
                response.status = 204;
                response.message = "laureate Id doesn't found";

                res.status(response.status).json(response.message);
            }
        }
    });
}
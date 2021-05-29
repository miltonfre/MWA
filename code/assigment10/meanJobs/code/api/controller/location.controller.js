const mongoose = require("mongoose");
const Job = mongoose.model("Job");
let response = require("../common/response");


module.exports.locationGet = function (req, res) {
    const jobId = req.params.jobId;
    Job.findById(jobId).select("location").exec(function (err, job) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            if (job) {
                response.status = 200;
                response.message = job.location;
            } else {
                response.status = 200;
                response.message = "job Id does not exist";
            }
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.locationAdd = function (req, res) {
    const jobId = req.params.jobId;
    console.log("Adding location to a job ID: " + jobId);
    Job.findById(jobId).select("location").exec(function (err, job) {
        if (err) {
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
        }
        else {
            if (job) {
                Job.findByIdAndUpdate(jobId, {
                    location:
                    {
                        streetAddress: req.body.streetAddress,
                        city: req.body.city,
                        state: req.body.state,
                        zipCode: req.body.zipCode
                    }
                }).exec(function (err, job) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.status = 200;
                        response.message = job;
                    }
                    res.status(response.status).json(response.message);
                });
            } else {
                response.status = 200;
                response.message = "job Id does not exist";
                res.status(response.status).json(response.message);
            }
        }

    });



}

module.exports.locationUpdate = function (req, res) {
    const jobId = req.params.jobId;
    console.log("Updating location to a job ID: " + jobId);


    Job.findById(jobId).select("location").exec(function (err, job) {
        if (err) {
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
        }
        else {
            if (job) {
                Job.findByIdAndUpdate(jobId, {
                    location:
                    {
                        streetAddress: req.body.streetAddress,
                        city: req.body.city,
                        state: req.body.state,
                        zipCode: req.body.zipCode
                    }
                }).exec(function (err, job) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.status = 200;
                        response.message = job;
                    }
                    res.status(response.status).json(response.message);
                });
            } else {
                response.status = 200;
                response.message = "job Id does not exist";
                res.status(response.status).json(response.message);
            }
        }
    });
}

module.exports.locationDelete = function (req, res) {
    const jobId = req.params.jobId;
    console.log("Deleting location for JobId: " + jobId);

    Job.findById(jobId).select("location").exec(function (err, job) {
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            if (job) {
                Job.findByIdAndUpdate(jobId, { location: {} }).exec(function (err, job) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                        res.status(response.status).json(response.message)
                    }
                    else {
                        if (!job) {
                            response.status = 404;
                            response.message = "Job ID not found";
                        } else {
                            response.status = 200;
                            response.message = "Publisher deleted";
                        }
                    }
                    res.status(response.status).json(response.message);
                });
            } else {
                response.status = 200;
                response.message = "job Id does not exist";
                res.status(response.status).json(response.message)
            }
        }
    });
}

const mongoose = require("mongoose");
const Job = mongoose.model("Job");
let response = require("../common/response");



module.exports.jobGetAll = function (req, res) {
    console.log("getting all jobs");
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
    Job.find().skip(offset*count).limit(count).exec(function (err, jobs) {
        if (err) {
            console.log("error getting all jobs", err);
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 200;
            response.message = jobs;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.jobGetOne = function (req, res) {
    const jobId = req.params.jobId;
    console.log("getting one job " + jobId);
    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("error getting one job", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (job) {
                response.status = 200;
                response.message = job;
            } else {
                response.status = 204;
                response.message = "job Id doesn't found";
            }

        }
        res.status(response.status).json(response.message);
    });
}

module.exports.jobAddOne = function (req, res) {
    console.log("adding one job");
    let newJob = {};
    if (req.body && req.body.title && req.body.skills && req.body.description) {
       
        newJob.title = req.body.title;
        newJob.description = req.body.description;
        newJob.salary = req.body.salary;
        newJob.experience = req.body.experience;
        newJob.skills = req.body.skills;
        newJob.posDate = new Date();
        Job.create(newJob, function (err, jobAdded) {
            if (err) {
                console.log("error adding one job", err);
                response.status = 400;
                response.message = err;
            }
            else {
                response.status = 201;
                response.message = jobAdded;
            }
            res.status(response.status).json(response.message);
        })
   
    }
    else {
        response.status = 400;
        response.message = "job title, description and skills are required";
        res.status(response.status).json(response.message);
    }
}

module.exports.jobUpdateOne = function (req, res) {
    const jobId = req.params.jobId;
    console.log("updating one job" + jobId);
    let jobEdit = {};
    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("error getting one job for update it", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (job) {
                if (req.body && req.body.title && req.body.skills && req.body.description) {
                   
                    jobEdit.title = req.body.title;
                    jobEdit.description = req.body.description;
                    jobEdit.salary = req.body.salary;
                    jobEdit.experience = req.body.experience;
                    jobEdit.skills = req.body.skills;
                    Job.findByIdAndUpdate(jobId, jobEdit).exec(function (err, jobUpdated) {
                        if (err) {
                            console.log("error updating the job", err);
                            response.status = 400;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = jobUpdated;
                        }
                        res.status(response.status).json(response.message);
                    });
                }
                else {
                    response.status = 400;
                    response.message = "job title, description and skills are required";
                    res.status(response.status).json(response.message);
                }
            } else {
                response.status = 204;
                response.message = "job Id doesn't found";
                res.status(response.status).json(response.message);
            }
        }
    });
}

module.exports.jobDeleteOne = function (req, res) {
    const jobId = req.params.jobId;
    console.log("deleting one job");
    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("error getting one job for update it", err);
            response.status = 500;
            response.message = err;
        }
        else {
            if (job) {
                Job.findByIdAndDelete(jobId, function (err) {
                    if (err) {
                        console.log("error updating one job", err);
                        response.status = 400;
                        response.message = err;
                    }
                    else {
                        response.status = 200;
                        response.message = "job deleted";
                    }
                    res.status(response.status).json(response.message);
                });
            }
            else {
                response.status = 204;
                response.message = "job Id doesn't found";
                
                res.status(response.status).json(response.message);
            }
        }
    });
}
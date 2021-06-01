const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");
let response = require("../common/response");


module.exports.usersRegister = function (req, res) {
    console.log('resgiter user');
    const newUser = {
        user: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }

    User.create(newUser, function (err, userAdded) {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = userAdded;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.usersAuthenticate = function (req, res) {
    const authUser = {
        username: req.body.username,
        password: req.body.password
    };

    User.findOne({ username: req.body.username }).exec(function (err, userLogged) {
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            if (userLogged) {
                console.log(bcrypt.compareSync(req.body.password, userLogged.password));
                if (bcrypt.compareSync(req.body.password, userLogged.password)) {
                    const token = jwt.sign({ name: userLogged.username }, "cs572", { expiresIn: 3600 });
                    response.status = 200;
                    response.message = {success: true, token: token};
                } else {
                    response.status = 401;
                    response.message = "user or password incorrect";
                }
            } else {
                response.status = 401;
                response.message = "user or password incorrect";
            }
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.authenticate = function (req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "cs572", function (err, decoded) {
            if (err) {
                console.log(err); res.status(401).json("Unauthorized");
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else { res.status(403).json("No token provided"); }
};
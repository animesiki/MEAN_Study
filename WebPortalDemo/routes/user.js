/**
 * Created by williamjiang on 2015/5/6.
 */
var path = require('path');
var UsersModel = require('../models/UsersModel');

var User = UsersModel.User;


exports.showLoginPage = function (req, res) {
    var html = path.normalize(__dirname + '/../app/login.html');
    res.sendfile(html);
};

exports.loginCheck = function (req, res) {
    console.log("request:" + req);
    console.log("request body:" + req.body);
    var name = req.body.name;
    var password = req.body.password;
    console.log(name);
    User.findOne({name: name, password: password}, function (error, doc) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        if (doc) {
            console.log(doc);
            req.session.user_id = doc._id;
            res.json(doc);
        }

    });

};

exports.logOut = function (req, res) {
    req.session.destroy(function (err) {
        // cannot access session here
        console.log("log out error" + err);
    });
    res.send('log out success');
};

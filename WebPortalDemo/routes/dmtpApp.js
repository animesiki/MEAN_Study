/**
 * Created by williamjiang on 2015/5/6.
 */
var AppModel = require('../models/AppModel');

var App = AppModel.App;
var Type = AppModel.Type;

exports.getAllApps = function (req, res) {
    App.find(function (error, docs) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        if (docs) {
            console.log(docs);
            console.log(docs[0].types);
            res.json(docs);
        }
    });

};

exports.getAppCount = function (req, res) {
    App.count(function (err, count) {
        if (err) {
            console.log(err);
        }
        res.send({'count': count});
    })

};
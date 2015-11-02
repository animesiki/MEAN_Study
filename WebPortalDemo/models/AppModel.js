/**
 * Created by williamjiang on 2015/5/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppSchema = new Schema({
    name: {type: String, unique: true},
    types: [String]
});

var App = mongoose.model('App', AppSchema);
exports.App = App;



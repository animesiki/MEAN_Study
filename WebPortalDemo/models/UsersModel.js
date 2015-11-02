/**
 * Created by williamjiang on 2015/5/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String},
    password: {type: String},
    email: {type: String},
    age: {type: Number,min:18,max:70}
});

exports.User = mongoose.model('User', UserSchema);
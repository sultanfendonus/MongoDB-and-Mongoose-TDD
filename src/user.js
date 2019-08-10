const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const userSchema = new Schema({
    name : String,
    posts : [PostSchema]
});

const User = mongoose.model('user',userSchema);

module.exports = User;
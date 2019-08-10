const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const userSchema = new Schema({
    name : String,
    posts : [PostSchema],
    blogPost : [{
        type : Schema.Types.ObjectId,
        ref : 'blogPost'
    }]
});

userSchema.virtual('postCount').get(function(){
    return this.posts.length;
})

const User = mongoose.model('user',userSchema);

module.exports = User;
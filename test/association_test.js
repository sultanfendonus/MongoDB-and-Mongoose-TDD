const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')
const Comment = require('../src/comment')

describe('Association test',()=>{
    let joe, blogPost, comment;

    beforeEach((done)=>{
        joe = new User({name : 'Joe'});
        blogPost = new BlogPost({title : "A Sweet Title", content : "A very good description of content."});
        comment = new Comment({content : "This is a comment"});

         joe.blogPost.push(blogPost);
         blogPost.comments.push(comment);
         comment.user = joe;


        Promise.all([joe.save(),blogPost.save(),comment.save()])
            .then(()=>done());
    })

    it('will create association',(done)=>{
        User.findOne({name : 'Joe'})
            .populate('blogPost')
            .then((user)=>{
                assert(user.blogPost[0].title === 'A Sweet Title')
                done();
            })

    })

    it('show full association tree',(done)=>{
        User.findOne({name : 'Joe'})
        .populate({
            path : 'blogPost',
            populate : {
                path : 'comments',
                model : 'comment',
                populate : {
                    path : 'user',
                    model : 'user'
                }
            }
        })
        .then((user)=>{
            assert(user.blogPost[0].comments[0].content === 'This is a comment');
            done();
        })
    })
})
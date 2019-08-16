const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware test',()=>{
    let joe, blogPost;

    beforeEach((done)=>{
        joe = new User({name : 'Joe'});
        blogPost = new BlogPost({title : "A Sweet Title", content : "A very good description of content."});

         joe.blogPost.push(blogPost);



        Promise.all([joe.save(),blogPost.save()])
            .then(()=>done());
    })

    it('should delete a user and also with its all blogpost by mogoose midleware',(done)=>{
        joe.remove()
            .then(()=>BlogPost.countDocuments())
            .then((count)=>{
                assert(count===0);
                done();
            })
    })
})
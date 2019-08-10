const assert = require('assert')
const User = require('../src/user')

describe('subdocument',()=>{
    it('can create a subdocument',(done)=>{
        const joe = new User({
            name : 'joe',
            posts : [{title: 'PostTitle'}]
        })

        joe.save()
            .then(()=>User.findOne({name:'joe'}))
            .then((result)=>{
                assert(result.posts[0].title==='PostTitle');
                done();
            })

        
    })

    it('will save post in an existing data',(done)=>{
        const Joe = new User({
            name:'Joe',
            posts:[]
        });

        Joe.save()
            .then(()=>User.findOne({name:'Joe'}))
            .then((user)=>{
                user.posts.push({title:"new post"})
                return user.save();
            })
            .then(()=>User.findOne({name:'Joe'}))
            .then((user)=>{
                assert(user.posts[0].title==='new post');
                done();
            })
    })

    it('can remove a subdocument',(done)=>{
        const Joe = new User({
            name: 'Joe',
            posts: [{title: "new Title"}]
        })
        Joe.save()
            .then(()=>User.findOne({name:"Joe"}))
            .then((user)=>{
                user.posts[0].remove();
                return user.save();
            })
            .then(()=>User.findOne({name:"Joe"}))
            .then((user)=>{
                assert(user.posts.length === 0);
                done();
            })
    })
})
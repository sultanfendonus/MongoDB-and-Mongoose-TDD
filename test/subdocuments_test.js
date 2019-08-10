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
})
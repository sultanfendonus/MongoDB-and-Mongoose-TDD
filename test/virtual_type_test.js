const assert = require('assert');
const User = require('../src/user');

describe('Virtual test',()=>{
    it('can test a virtual type property',(done)=>{
        const Joe = new User({
            name:'Joe',
            posts:[{title:"new title"}]
        });

        Joe.save()
            .then(()=>{
                assert(Joe.postCount === 1);
                done();
            })
    })
})
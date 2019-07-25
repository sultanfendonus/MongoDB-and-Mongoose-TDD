const User = require('../src/user');
const assert = require('assert');

describe("create user",()=>{
    it('should create new user',(done)=>{
        const singleUser = new User({name : "Joe"});
        singleUser.save()
            .then(()=>{
                assert(!singleUser.isNew);
                done();
            });
    })
})
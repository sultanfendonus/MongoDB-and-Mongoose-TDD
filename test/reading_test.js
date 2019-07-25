const User = require('../src/user');
const assert = require('assert');

describe('Reading Test',()=>{
    let user;

    beforeEach((done)=>{
        user = new User({name : 'Joe'});
        user.save()
            .then(()=>{
                done();
            })
    })

    it('should read all data of Joe',(done)=>{
        User.find({name : 'Joe'})
            .then((users)=>{
                assert(users[0]._id.toString()===user._id.toString());
                done();
            })
    });

    it('read a particular id',(done)=>{
        User.findOne({_id : user._id})
            .then((user)=>{
                assert(user.name==='Joe');
                done();
            })
    })
});
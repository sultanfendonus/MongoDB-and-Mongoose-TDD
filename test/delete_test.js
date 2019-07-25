const User = require('../src/user');
const assert = require('assert');

describe('delete Test',()=>{

    let singleUser;
    beforeEach((done)=>{
        singleUser = new User({name : 'Joe'});
        singleUser.save()
            .then(()=>{
                done();
            })
    })

    it('should delete a user by model instance',(done)=>{
        singleUser.remove()
            .then(()=>User.findOne({name:'Joe'}))
            .then((users)=>{
                assert(users===null);
                done();
            })
    });

    it('should delete a user by its class instance',(done)=>{
        User.remove({name:'Joe'})
            .then(()=>User.findOne({name:'Joe'}))
            .then((users)=>{
                assert(users===null);
                done();
            })

    });

    it('should delete a user by class instance with find and remove',(done)=>{
        User.findOneAndRemove({name:'Joe'})
            .then(()=>User.findOne({name:'Joe'}))
            .then((users)=>{
                assert(users===null);
                done();
            })
    });

    it('should delete a user by its class and find by id',(done)=>{
        User.findByIdAndRemove(singleUser._id)
            .then(()=>User.findOne({name:'Joe'}))
                .then((users)=>{
                    assert(users===null);
                    done();
                })
    })
})
const User = require('../src/user');
const assert = require('assert');

describe('Update Test',()=>{

    let singleUser;
    beforeEach((done)=>{
        singleUser = new User({name : 'Joe'});
        singleUser.save()
            .then(()=>{
                done();
            })
    })

    function assertName(operation,done){
        operation
        .then(()=>User.find({}))
        .then((users)=>{
            assert(users.length===1);
            assert(users[0].name==='alex');
            done();
        })
    }

    it('should update data set and save by model instance',(done)=>{
        singleUser.set('name','alex');
        assertName(singleUser.save(),done);    
    });

    it('should update by update method by model instance',(done)=>{
        assertName(singleUser.update({name:'alex'}),done);

    })

    it('should find and update by model class',(done)=>{
        assertName(
            User.update({name:'Joe'},{name:'alex'}),
            done
        )
    })

    it('should find a data and update by findOneAndUpdate by model class',(done)=>{
        assertName(
            User.findOneAndUpdate({name:'Joe'},{name:'alex'}),
            done
        )
    })

    it('should find a data by its id and update by model class',(done)=>{
        assertName(
            User.findByIdAndUpdate(singleUser._id,{name:'alex'}),
            done
        )
    })

})
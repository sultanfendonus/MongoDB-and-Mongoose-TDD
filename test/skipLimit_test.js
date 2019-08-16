const User = require('../src/user');
const assert = require('assert');

describe('Reading Test',()=>{
    let joe,maria,sultan,tanmay;

    beforeEach((done)=>{
        joe = new User({name : 'Joe'});
        maria = new User({name : 'Maria'});
        sultan = new User({name : 'Sultan'});
        tanmay = new User({name : 'Tanmay'});

        Promise.all([joe.save(), maria.save(), sultan.save(), tanmay.save()])
            .then(()=>done());
    })

   it('can skip and limit result set',(done)=>{
        User.find({})
        .sort({name : 1})
        .skip(1)
        .limit(2)
            .then((users)=>{
                assert(users.length === 2);
                console.log(users);
                assert(users[0].name ==='Maria');
                assert(users[1].name === 'Sultan');
                done();
            })
   })
});
const {ObjectID} = require ('mongodb');
const jwt = require('jsonwebtoken');

const{Todo} = require ('./../../models/todo');
const{user} = require('./../../models/user');

const UserOneID = new ObjectID();
const UserTwoId = new ObjectID();
const users =[
    {
       _id: UserOneID,
       email:'prabhat@example.com',
       password: 'UserOnePass',
       tokens: [{
           access: 'auth',
           token: jwt.sign({_id: UserOneID, access: 'auth'}, 'abc123').toString()
       }]
    },
    {
       _id: UserTwoId,
       email:'prabhat@exampletwo.com',
       password: 'UserTwoPass'
    }
    
    ];


const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
     _id: new ObjectID(),
    text: 'Second test todo', 
    completed: true, 
    completedAt: 333
}];

const populateTodos = (done)=> {
    Todo.remove({}).then(() => {
      return  Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) =>{
    user.remove({}).then(() =>{
       var UserOne = new user(users[0]).save();
       var UserTwo = new user(users[1]).save();

       return Promise.all([UserOne, UserTwo]);
    }).then(()=> done());
};

module.exports ={ todos, populateTodos, users, populateUsers};
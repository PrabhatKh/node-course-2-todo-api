const{ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

// var id='5951cdf2c0a28d060617dd5911';
var id = '5950d5a494fdf23027fddb1d';

user.findById(id).then((user)=>{
    if(!user){
        console.log('user not found')
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e)=> console.log(e));

// if(!ObjectId.isValid(id)){
//   console.log('ID is not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos)=> {
//     console.log('Todos', todos);
// });

// Todo.findOne ({
//     _id: id
// }).then((todo)=> {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=> {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo BY id', todo);
// }).catch((e) => console.log(e));
const{ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

//To remove everything from database

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

// Todo.findOneAndRemove

//Todo.findBYIDAndRemove

// Todo.findOneAndRemove({_id: '59545c4c78dbbc6d5852b757'}).then((todo) =>{
//     console.log(todo);
// });

Todo.findByIdAndRemove('59545c4c78dbbc6d5852b757').then((todo)=>{
    console.log(todo);
});
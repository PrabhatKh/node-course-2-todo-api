var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

//HeroKU: https://murmuring-brook-54579.herokuapp.com/todos

module.exports ={
    mongoose
};
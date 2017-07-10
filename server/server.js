require('./config/config.js');


const {ObjectId} = require('mongodb');
const _ = require('lodash');

const express = require('express');
const bodyParser = require ('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require ('./models/todo');
var {user} = require ('./models/user');
var {authenticate} = require ('./middleware/authenticate');

var app=express();
const port = process.env.PORT; //HeroKU

app.use(bodyParser.json());

app.post('/todos', (req, res)=> {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.text
    });

    todo.save().then((doc)=> {
        res.send(doc);
    }, (e)=> {
        res.send(e);
    });
});

app.get('/todos', (req,res) =>{
   Todo.find().then((todos)=> {
      res.send({todos});
   }, (e) => {
      res.status(400).send(e);
   });
});

app.get('/todos/:id', (req, res)=> {
    var id = req.params.id;
  // res.send(req.params);

  if(!ObjectId.isValid(id)){
     return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
      if(!todo){
          return res.status(404).send();
      }
      res.send({todo});
  }).catch((e) => res.status(404).send());

});

app.delete('/todos/:id', (req, res)=> {
    //get the id
   var id= req.params.id;

   if(!ObjectId.isValid(id)){
       return res.status(404).send();
   }

   Todo.findByIdAndRemove(id).then((todo)=>{
       if(!todo){
           return res.status(404).send();
       }
       res.send({todo});
   }).catch((e)=> res.status(404).send());
});

app.patch('/todos/:id', (req, res) =>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectId.isValid(id)){
       return res.status(404).send();
     }

    if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
    }
    else{
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) =>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e) => {
        res.status(404).send();
    })

});

//POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var users = new user(body);
   
    users.save().then(() =>{
       return users.generateAuthToken();
       // res.send(user);
    }).then((token) =>{
        res.header('x-auth', token).send(users);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});


app.get('/users/me',authenticate, (req, res) =>{
    res.send(req.user);
});

//POST /users/login
app.post('/users/login', (req, res) =>{
    var body = _.pick(req.body, ['email', 'password']);
    
   // console.log(body.email, body.password);
    user.findByCredentials(body.email, body.password).then((user) =>{
       return user.generateAuthToken().then((token) =>{
            res.header('x-auth', token).send(user);
        });
    }).catch((e) =>{
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});

module.exports = { app};
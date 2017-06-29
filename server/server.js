const {ObjectId} = require('mongodb');

var express = require('express');
var bodyParser = require ('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require ('./models/todo');
var {user} = require ('./models/user');

var app=express();
const port = process.env.PORT || 3000; //HeroKU

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

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});

module.exports = { app};
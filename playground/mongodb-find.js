// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
     if(err) {
        return console.log('Unable to connect to database');
     }

     console.log('Connected to Mongodb Server');

     db.collection('Users').find({
         name : 'Prabhat'
        }).toArray().then((docs)=>{
          console.log('Todos');
          console.log(JSON.stringify(docs,undefined,2));
     }, (err)=> {
         console.log(err);
     })

    // db.collection('Todos').find().count().then((count)=>{
    //       console.log(`Todos Count: ${count}`);
    //  }, (err)=> {
    //      console.log(err);
    //  })

    // db.close();
});
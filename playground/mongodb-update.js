// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
     if(err) {
        return console.log('Unable to connect to database');
     }

     console.log('Connected to Mongodb Server');

    //  db.collection('Todos').findOneAndUpdate({
    //      _id: new ObjectID('594fa4eb595748c917dab5d4')
    //  }, {
    //      $set: {
    //          completed: true
    //                  }
    //  }, {
    //      returnOriginal: false
    //  }).then((result) => {
    //      console.log(result);
    //  });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('594f8fc74b0fd00e572989e3')
    }, {
        $set: {
            name: 'Prabhat'
        },
        $inc: {
            age: 1
        }
    }, {
       returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });   
    // db.close();
});
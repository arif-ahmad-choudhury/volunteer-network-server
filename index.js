const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cfjij.mongodb.net/volunteerNetwork?retryWrites=true&w=majority`;

const port = 5000;
const app = express()
app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    
  const volunteerWork= client.db("volunteerNetwork").collection("volunteerWork");
  const events = client.db("volunteerNetwork").collection("events");
  console.log("database");

  app.post('/volunteerWorks',(req, res)=>{
    const work = req.body;
    volunteerWork.insertMany(work)
    .then(result=>{     
      res.send(result);
    })
    console.log(work);
  });
  
  app.get('/volunteerWorks',(req, res)=>{
      volunteerWork.find({})
      .toArray((err,documents)=>{
          res.send(documents);
      })
  });

  app.post('/singleEvent',(req, res)=>{
      const newEvents = req.body;
      events.insertOne(newEvents)
      .then(result=>{
        //  console.log(result);
         res.send(result);
      })
  });
  app.get('/singleEvent',(req, res)=>{
    events.find({ email: req.query.email})
    .toArray((err,documents)=>{
        res.send(documents);
    })
});
app.get('/adminAllEvents',(req, res)=>{
  events.find({})
  .toArray((err,documents)=>{
      res.send(documents);
  })
});
app.get('/adminAddEvents',(req, res)=>{
  events.find({})
  .toArray((err,documents)=>{
      res.send(documents);
  })
})

app.delete('/delete/:id', (req, res)=>{  
  events.deleteOne({_id:ObjectId(req.params.id)})
  .then((result)=>{
    console.log(result);
  })
})
  app.get('/', (req, res)=>{
    res.send('Hello Heroku Working !!!')
  })
})

app.listen(process.env.PORT || port)
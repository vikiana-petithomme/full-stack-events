const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var objectId = require('mongodb').ObjectId
const dotenv = require('dotenv');
 
dotenv.config()

var db, collection;

const url = "mongodb+srv://vikiana:a123b@cluster0.6ozuol9.mongodb.net/gridEvents?retryWrites=true&w=majority";

const dbName = "gridEvents";

app.listen(4000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))


app.get('/', (req, res) => {
  db.collection('events').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {events: result})
  })
})


app.post('/events', (req, res) => {  
  db.collection('events').save({
    eventFlier: req.body.eventFlier,
    eventName: req.body.eventName, 
    eventHost: req.body.eventHost, 
    eventDate: req.body.eventDate,
    eventStartTime: req.body.eventStartTime, 
    eventEndTime: req.body.eventEndTime, 
    eventLocation: req.body.eventLocation, 
    eventDescription: req.body.eventDescription,
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/updateEvent', (req, res) => {
  db.collection('events')
  .findOneAndUpdate({
    _id: objectId(req.body._id)
  }, {
    $set: {
      eventName: req.body.eventName, 
      eventHost: req.body.eventHost, 
      eventStartTime: req.body.eventStartTime, 
      eventDate: req.body.eventDate,
      eventEndTime: req.body.eventEndTime, 
      eventLocation: req.body.eventLocation, 
      eventDescription: req.body.eventDescription

    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
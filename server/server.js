require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose'); //For connection purpose
const {Users} = require('./model/user');

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());  //Use to parse the middleware request into object

// -----------------------------------------------------------------------------
app.post('/users', (req,res) => {
  var userModel = req.body.intrests;
  var user = new Users({
    name : req.body.name,
    email : req.body.email,
    phone : req.body.phone,
    designation : req.body.designation,
    address : req.body.address,
    intrests : req.body.intrests
  });


  user.save().then((userData) => {
    res.status(200).send(userData);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

// -----------------------------------------------------------------------------

app.delete('/users/:id',(req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Users.findByIdAndRemove(id).then((results) => {
    if(!results){
      return res.status(404).send();
    }
    res.send({results});
  }).catch((e) => {
    res.status(400).send();
  })
});
// ----------------------------------------------------------------------------
app.patch('/users/:id',(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['name','email','phone','designation','address','intrests']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Users.findByIdAndUpdate(id,{$set : body},{new : true}).then((result) => {
    if(result === null){
      return res.status(404).send();
    }
    res.send({result});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port,() => {
  console.log(`Connected to port ${port}`);
});

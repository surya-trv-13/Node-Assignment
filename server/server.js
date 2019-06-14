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
// POST /users
app.post('/users', (req,res) => {
  var userModel = req.body.interests;
  var user = new Users({
    name : req.body.name,
    email : req.body.email,
    phone : req.body.phone,
    designation : req.body.designation,
    address : req.body.address,
    interests : req.body.interests
  });


  user.save().then((userData) => {
    res.status(200).send(userData);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

// -----------------------------------------------------------------------------
// DELETE /users/:id
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
// PATCH /users/:id
app.patch('/users/:id',(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['name','email','phone','designation','address','interests']);

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
// ----------------------------------------------------------------------------
// API for getting all the users who have interests
app.get('/user/coding',(req,res) => {
  Users.find({interests : {$all : ['Coding']}}).then((userModel) => {
    if(!userModel){
      res.status(404).send();
    }
    res.status(200).send(userModel);
  }).catch((e) => {
    res.status(400).send();
  });
});


app.listen(port,() => {
  console.log(`Connected to port ${port}`);
});

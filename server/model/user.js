const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;


var UserSchema = new Schema({
  name : {
    type : String,
    required : true,
    trim : true,
    minlength : 5,
    unique : true
  },
  email : {
    type : String,
    required : true,
    trim : true,
    minlength : 5,
    validiate : {
      validator : validator.isEmail,
      message : 'Email is Valid'
    }
  },
  phone : {
    type : Number,
    minlength : 10,
    required : true
  },
  designation : {
    type : String,
    minlength : 4,
    required : true
  },
  address : {
    type: String,
    required : true
  },
  intrests : {
      type : Array,
      default : 'somethings',
      required : true
    }
});

var Users = mongoose.model('Users',UserSchema);

module.exports = {Users};

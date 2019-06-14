const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

var CommentSchema = new Schema({
  name : {
    type : String,
    required : true,
  },
  comment : {
    type : Array,
    required : true,
    default : []
  }
});

CommentSchema.statics.findByCredential = function(name) {
  var Comment = this;

  return Comment.findOne({name}).then((user) => {
    if(!user){
      return false;
    }
    console.log(user);
    return user;
  }).catch((e) => {
    return false;
  });
}

CommentSchema.methods.concatComment = function(newComment){
  var commentSchema = this;

  commentSchema.comment = commented.comment.concat(newComment);

  return commentSchema.save().then((user) => {
    return commentSchema;
  });
}

var Comment = mongoose.model('Comment',CommentSchema);

module.exports = {Comment};

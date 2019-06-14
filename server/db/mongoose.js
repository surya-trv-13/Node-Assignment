const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useFindAndModify: false
});


module.exports = {mongoose};

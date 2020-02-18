const mongoose = require('mongoose'); // requiring the module

const userSchema = mongoose.Schema({ // creating the schema (data structure which will save)

  username: {type: String, unique: true},
  fullname: {type: String, unique: true, default:''},
  email: {type: String, unique: true},
  password: {type: String, default: ''},
  //userImage: {type: String, default: 'ddefault.png'}
});

module.exports = mongoose.model('User', userSchema); // exporting the user data

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: String,
  gender: String,
  email: String,
  pass: String,
  profPicAddress: String,
  friendRequestsOut: [],
  friendRequestsIn: [],
  friends: []
});

module.exports = mongoose.model('user', userSchema);

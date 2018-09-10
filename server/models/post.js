const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: String
});

module.exports = mongoose.model('post', postSchema);

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const postSchema = new Schema({
  userID: String,
  publishDate: Number,
  message: String,
  images: [],
  videos: [],
  audios: []
});

module.exports = mongoose.model('post', postSchema);

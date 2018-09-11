const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: String,
  dateAndTime: Number,
  message: String,
  images: [],
  videos: [],
  audios: []
});

module.exports = mongoose.model('post', postSchema);

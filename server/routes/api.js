const router = require('express').Router(),
  fs = require('fs-extra'),
  path = require('path'),
  mongoose = require('mongoose'),
  dev = require('./api.dev'),
  async = require('async');

const db = process.env.DB_LOCAL;
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.error('Error! ' + err);
  }
});

// error messages
const SERVER_ERROR = 'SERVER_ERROR';

// routes


// development routes
router.use('/dev', dev);

module.exports = router;

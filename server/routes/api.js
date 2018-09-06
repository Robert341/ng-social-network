const router = require('express').Router(),
  fs = require('fs-extra'),
  path = require('path'),
  mongoose = require('mongoose'),
  dev = require('./api.dev'),
  async = require('async');

// models
const User = require('../models/user');

const db = process.env.DB_LOCAL;
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.error('Error! ' + err);
  }
});

// error messages
const SERVER_ERROR = 'SERVER_ERROR',
  EMAIL_REGISTERED = 'EMAIL_REGISTERED',
  NO_SUCH_USER = 'NO_SUCH_USER',
  NO_SESSION = 'NO_SESSION';

// routes
router.post('/register', function(req, res) {
  var newUser = new User();

  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.dateOfBirth = req.body.dateOfBirth;
  newUser.gender = req.body.gender;
  newUser.email = req.body.email;
  newUser.pass = req.body.pass;
  newUser.profPicAddress = 'blank_prof_pic.png';

  User.find({ email: newUser.email }).exec(function(err, users) {
    if (err) {
      res.json({ success: false, message: SERVER_ERROR });
    } else if (users.length !== 0) {
      res.json({ success: false, message: EMAIL_REGISTERED });
    } else {
      newUser.save(function(err, user) {
          if (err) {
            res.json({ success: false, message: SERVER_ERROR });
          } else {
            const userFolder = path.join(__dirname, '../../src/assets/img/users/' + user._id);

            fs.mkdirSync(userFolder);
            fs.mkdirSync(userFolder + '/profile');
            fs.mkdirSync(userFolder + '/wall');

            req.session.user_id = user._id;
            res.json({ success: true });
        }
      });
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.user_id = undefined;
  if (req.session.user_id !== undefined) {
    res.json({ success: false, message: SERVER_ERROR });
  } else {
    res.json({ success: true });
  }
});


// development routes
router.use('/dev', dev);

module.exports = router;

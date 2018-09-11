const router = require('express').Router(),
  fs = require('fs-extra'),
  path = require('path'),
  mongoose = require('mongoose'),
  dev = require('./api.dev'),
  async = require('async');

// models
const User = require('../models/user'),
  Post = require('../models/post');

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
  WRONG_PASSWORD = 'WRONG_PASSWORD',
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
  newUser.regDate = req.body.regDate;
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
            // create users files folders (for images, videos and audios)
            var imagesFolder = path.join(__dirname, '../../dist/assets/images/users/' + user._id),
              videosFolder = path.join(__dirname, '../../dist/assets/videos/users/' + user._id),
              audiosFolder = path.join(__dirname, '../../dist/assets/audios/users/' + user._id);
            fs.mkdirSync(imagesFolder);
            fs.mkdirSync(videosFolder);
            fs.mkdirSync(audiosFolder);

            // dev
            imagesFolder = path.join(__dirname, '../../src/assets/images/users/' + user._id);
            videosFolder = path.join(__dirname, '../../src/assets/videos/users/' + user._id);
            audiosFolder = path.join(__dirname, '../../src/assets/audios/users/' + user._id);
            fs.mkdirSync(imagesFolder);
            fs.mkdirSync(videosFolder);
            fs.mkdirSync(audiosFolder);

            req.session.user_id = user._id;
            res.json({ success: true });
        }
      });
    }
  });
});

router.post('/login', function(req, res) {
  const email = req.body.email,
    pass = req.body.pass;

  User.find({ email: email }).exec(function(err, users) {
    if (err) {
      res.json({ success: false, message: SERVER_ERROR });
    } else if (users.length === 0) {
      res.json({ success: false, message: NO_SUCH_USER });
    } else {
      User.findOne({ email: email, pass: pass }).exec(function(err, user) {
        if (err) {
          res.json({ success: false, message: SERVER_ERROR });
        } else if(user === null) {
          res.json({ success: false, message: WRONG_PASSWORD });
        } else {
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

router.get('/get_user', function(req, res) {
  const user_id = req.session.user_id;

  if(user_id === undefined) {
    res.json({ isLogged: false, message: NO_SESSION });
  } else {
    User.findById(user_id).exec(function(err, user) {
      if(err) {
        res.json({ isLogged: false, message: SERVER_ERROR });
      } else {
        res.json({ isLogged: true, user: user });
      }
    });
  }
});

router.post('/delete_user', function(req, res) {
  const user_id = req.body.user_id;

  User.findByIdAndDelete(user_id, function(err, deletedUser) {
    if (err) {
      res.json({ success: false, message: SERVER_ERROR });
    } else {
      // delete users files folders (for images, videos and audios)
      var imagesFolder = path.join(__dirname, '../../dist/assets/images/users/' + deletedUser._id),
        videosFolder = path.join(__dirname, '../../dist/assets/videos/users/' + deletedUser._id),
        audiosFolder = path.join(__dirname, '../../dist/assets/audios/users/' + deletedUser._id);
      fs.removeSync(imagesFolder);
      fs.removeSync(videosFolder);
      fs.removeSync(audiosFolder);

      // dev
      imagesFolder = path.join(__dirname, '../../src/assets/images/users/' + deletedUser._id);
      videosFolder = path.join(__dirname, '../../src/assets/videos/users/' + deletedUser._id);
      audiosFolder = path.join(__dirname, '../../src/assets/audios/users/' + deletedUser._id);
      fs.removeSync(imagesFolder);
      fs.removeSync(videosFolder);
      fs.removeSync(audiosFolder);

      req.session.user_id = undefined;
      res.json({ success: true });
    }
  });
});
/*
router.post('/publish_post', function(req, res) {
  var newPost = new Post();
  newPost.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.minSize = req.body.minSize;
  newProduct.maxSize = req.body.maxSize;
  newProduct.season = req.body.season;
  newProduct.description =  req.body.description;
  newProduct.date = Date.now();
  newProduct.save(function(err, product){
    if(err){
      res.json({ success: false });
    } else {
      var photo = req.files.photo;
      var dir = path.join(__dirname,'../../src/assets/img/products/');
      photo.mv(dir + product._id + '.png', function(err){
        if(err){
          res.json({ success: false });
        } else {
          res.json({ success: true, product: product });
        }
      });
    }
  });
});
*/
// development routes
router.use('/dev', dev);

module.exports = router;

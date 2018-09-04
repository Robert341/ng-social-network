const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  cookieSession = require('cookie-session'),
  fileUpload = require('express-fileupload'),
  socket = require('socket.io');

require('dotenv').config();

const api = require('./server/routes/api');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['key']
}));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/api', api);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var server = app.listen(port, function() {
  console.log('Server running on localhost:' + port);
});

var io = socket(server, { wsEngine: 'ws' });

io.on('connection', function(socket) {
  console.log('Made socket connection: ', socket.id);

  socket.on('disconnect', function() {
    console.log('Socket disconnected');
  });
});

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//
var io = require('socket.io')(80);

//controllers
var poll = require('./controllers/poll.js');



//Mongostuff
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/pollr');


//Socket Stuff
io.on('connection', function (socket) {
  //Calls the function to load the page. Goes to poll.js and then to pollpage.js
  socket.on('loadPage', function (data) {
    // when a socket request a load, we will put them in a room for the poll
    // the room name can be anything, preferably it would be only the poll hash
    // but since the script is currently sending the full url, we will use this as the room name
    // first, check if the data packet even has a url

    if (data.hash)
    {
      // if url exists, join the room with the url as name
      socket.join(data.hash);
      // send the sockett the data for the poll
      poll.findPollSocket(socket, data.hash);
    }

  });
  //Calls the function to increment the vote. Goes to poll.js and then to pollpage.js
  socket.on('vote', function(data){
    poll.updatePoll(socket, data);
  });
    
    socket.on('retrieveHomePolls', function(){
        poll.allPolls(socket);
    });
});

//Routes vars
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Route uses
app.use('/', routes);
app.post('/new', function(req, res, next){
  poll.newPoll(req, res, next);
})
app.use('/*', function(req, res, next){
  res.render('poll');
})
//app.use('/poll/new', pollRoute);
//app.use('/users', users);



module.exports = app;
//module.exports.io = io;

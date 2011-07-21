
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);
require.paths.push(__dirname);
var EVENTS = require('remote.events');

// Configuration

app.configure(function(){
  __dir_root = __dirname + '/../';
  app.set('views', __dir_root + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](__dir_root + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
  io.enable('browser client minification');
  io.enable('browser client etag');
  io.set('log level', 1);
  io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Remote.IO'
  });
});

app.get('/widget', function(req, res){
  res.render('widget', {
      layout: false,
    title: 'Remote.IO'
  });
});

app.get('/joystick', function(req, res){
  res.render('joystick', {
      layout: false,
    title: 'Remote.IO'
  });
});


// IO
io.sockets.on('connection', function(socket) {
    socket.on('disconnect', function() {
        io.sockets.emit('disconnected');
    });

    socket.on(EVENTS.OTHER, function(msg) {
        socket.broadcast.emit(EVENTS.NEWS, msg);
    });

});
// Only listen on $ node app.js

if (!module.parent) {
  app.listen(80);
  console.log("Express server listening on port %d", app.address().port);
}

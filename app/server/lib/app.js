
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);
require.paths.push(__dirname);
var events = require('remote.events');

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
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Remote.IO'
  });
});


// IO
io.sockets.on('connection', function(socket) {
    socket.on('disconnect', function() {
        io.sockets.emit('disconnected');
    });
    socket.emit(events.news, {hello: 'world'});

    socket.on(events.other, function(msg) {
        console.log('say:'+msg);
    });
});
// Only listen on $ node app.js

if (!module.parent) {
  app.listen(80);
  console.log("Express server listening on port %d", app.address().port);
}

// Create a web server
// Create a web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = require('./comments');
var mime = require('mime');

var server = http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  if (pathname === '/') {
    pathname = '/index.html';
  }
  var extname = path.extname(pathname);
  if (extname === '.html') {
    res.setHeader('Content-Type', 'text/html');
  }
  if (extname === '.css') {
    res.setHeader('Content-Type', 'text/css');
  }
  if (extname === '.js') {
    res.setHeader('Content-Type', 'text/javascript');
  }
  if (extname === '.jpg') {
    res.setHeader('Content-Type', 'image/jpeg');
  }
  if (extname === '.png') {
    res.setHeader('Content-Type', 'image/png');
  }
  if (extname === '.gif') {
    res.setHeader('Content-Type', 'image/gif');
  }
  if (extname === '.json') {
    res.setHeader('Content-Type', 'application/json');
  }
  fs.readFile(path.join(__dirname, pathname), function(err, data) {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.end('Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': mime.lookup(extname)
      });
      res.end(data);
    }
  });
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  socket.on('getAllComments', function() {
    comments.getAll(function(err, comments) {
      if (err) {
        socket.emit('error', err);
      } else {
        socket.emit('allComments', comments);
      }
    });
  });
  socket.on('addComment', function(comment) {
    comments.add(comment, function(err) {
      if (err) {
        socket.emit('error', err);
      } else {
        socket.emit('commentAdded');
        socket.broadcast.emit('commentAdded', comment);
      }
    });
  });
});

server.listen(3000, function() {
  console.log('Server listening on port 3000');
});
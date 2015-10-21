var restify = require('restify');
var db = require('./db_handler.js');

var server = restify.createServer();

/* WEBSERVICE IMPLEMENTATION */
server.get('/todo/all', function (req, res) {

    db.getAll(function (err, result) {

      if (err) {
        console.log(err.message);
        return;
      }

      res.writeHead(200, {
        'Content-Length': result.length,
        'Content-Type': 'text/json'
      });
      res.write(result);
      res.end();
    });
});

server.get('/todo/areAllComplete', function (req, res) {
    console.log('got a request asking if all todos are complete');
    // TODO implement
});

server.post('/todo/:text', function (req, res) {
    console.log('got a request to post a todo with text %s', req.params.text);
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    db.addTodo(id, req.params.text, function (err) {
      if (err) {
        console.log(err);
      }
    });
});

server.put('/todo/:id/:updates', function (req, res) {
    console.log('got a request to update a todo with id %s and update %s', req.params.id, req.params.updates);
    // TODO implement updating a todo
});

server.put('/todo/:updates', function (req, res) {
    console.log('got a request to update all todos with update %s', req.params.updates);
    // TODO implement updating all todos
});

server.del('/todo/:id', function (req, res) {
    console.log('got a request to delete a todo with id %s', req.params.id);
    // TODO implement deleting a todo
});

server.del('/todo/allCompleted', function (req, res) {
    console.log('got a request to delete all completed todos');
    // TODO implement deleting all completed todos
    // for (var id in _todos) {
    // 	if (_todos[id].complete) {
    // 		destroy(id);
    // 	}
    // }
});

server.use(function (req, res, next) {
  console.log('%s: %s', req.method, req.url);
  next();
});

server.listen(9999, function () {
    console.log('%s listening at port %s', server.name, server.url);
});

db.init(function (err) {
  if (err) {
    console.log('Database initialization failed. The webservice will now shut down.\nThis is the error message: ' + err);
    server.close();
  }
});

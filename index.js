var restify = require('restify');
var db = require('./db_handler.js');

var server = restify.createServer();

/* WEBSERVICE IMPLEMENTATION */

// Workaround for "No 'Access-Control-Allow-Origin' header is present on the requested resource"-error
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3005');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

server.get('/todo/all', function (req, res) {

    db.getAll(function (err, result) {

      if (err) {
        console.log(err.message);
        return;
      }

      var rows = result.rows[0];
      if (rows) {
        var json = JSON.stringify(rows);
        res.writeHead(200, {
          'Content-Length': json.length,
          'Content-Type': 'text/json'
        });
        res.write(json);
      }
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

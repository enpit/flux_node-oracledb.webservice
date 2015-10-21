var restify = require('restify');

var server = restify.createServer();

/* WEBSERVICE IMPLEMENTATION */
server.get('/todo/all', function (req, res) {
    console.log('got a request to get all todos');
    // TODO implement getting all todos
});

server.post('/todo/:text', function (req, res) {
    console.log('got a request to post a todo with text %s', req.params.text);
    // TODO implement posting a todo
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
});

server.listen(7002, function () {
    console.log('%s listening at port %s', server.name, server.url);
});

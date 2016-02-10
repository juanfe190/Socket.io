//EXPRESS FRAMEWORK IMPLEMENTATION
var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);

//IO IMPLEMENTATION
var io = require('socket.io').listen(server);
server.listen(3000);

//EJS IMPLEMENTATION
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//var ioHandler = require('./socket');
//ioHandler.connectionStart();

//ROUTING
app.get('/', function(request, response){
	response.render('index.html');
});


var ioHandler = require('./socket.js');
ioHandler.connectionStart(io);
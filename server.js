try { require('dotenv').config(); } catch (error) { }

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var routes = require('./server/routes/index');
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

const port = process.env.PORT || 3000;
console.log("Starting sevrer listening on http://localhost:%d", port);
server.listen(port);
io.set("origins", "*:*");

io.on('connection', require('./server/routes/socket.js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
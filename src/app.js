var express = require('express');
var app = express();
var connection_config = require('./mysql_config.js');
var mysql      = require('mysql');
var connection =  mysql.createConnection(connection_config);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/sql', function(req, res) {
  connection.connect();

  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    res.send('The solution is: ' + rows[0].solution);
  });

  connection.end();
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

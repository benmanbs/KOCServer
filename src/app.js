var express = require('express');
var app = express();
var _ = require('underscore');
var connection_config = require('./mysql_config.js');
var mysql      = require('mysql');
var connection =  mysql.createConnection(connection_config);

// Connect the sql connection;
connection.connect();

connection.on(
app.get('/', function (req, res) {
  res.send('Hello World!');
});

/**
 * This method return the entire list of days, with their attached events.
 */
app.get('/days', function(req, res) {
  connection.query('SELECT * FROM sDay LEFT OUTER JOIN sEvent ON sDay.dayID = sEvent.dayNum WHERE sEvent.title IS NOT NULL ORDER BY sDay.dayID', function(err, rows, fields) {
    if (err) throw err;

    // initialize holder object
    var data = {};

    _.each(rows, function(row) {
      var item = data[row.dayID] || (data[row.dayID] = {
        dayID: row.dayID,
        displayName: row.displayName,
        available: row.available,
        events: []
      });

      item.events.push({
        title: row.title,
	time: row.time,
	hasMap: row.hasMap,
	mapURL: row.mapURL,
	eventID: row.eventId
      });
    });
    
    res.send(_.values(data));
  });

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('KOC app listening at http://%s:%s', host, port);

});

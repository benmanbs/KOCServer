/**
 * Starts up the Kids of Courage app.
 *
 * @author bshai date 7/5/15.
 */

var express = require('express');
var app = express();
var api = require('./api.js');
//var site = require('./site.js');

// Start up both controllers
api.start(app);
//site.start();

// Start listening on port 3000
var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('KOC app listening at http://%s:%s', host, port);

});

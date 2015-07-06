/**
 * This file initializes all the endpoints needed to serve the static site.
 *
 * @author bshai date 7/6/15.
 */
var express = require('express');
var path = require('path');
var imageUtils = require('./imageUtils');

var start = function(app) {

    /**
     * Make the images accessible to be shown
     */
    app.use('/static/images', express.static('./images'));

    /**
     * Serve index.html
     */
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../index.html'));
    });

    /**
     * Get a list of all the available images
     */
    app.get('/api/images', function(req, res) {
        imageUtils.listAllImages(function(files){
            res.send(files);
        }, function(){
            res.status(500).send('Something went terribly wrong. Please contact server admin').end();
        })
    })
};

module.exports = {
    start: start
};
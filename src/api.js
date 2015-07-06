var connection = require('./mysql.js');
var multer = require('multer');
var imageUtils = require('./imageUtils');

var start = function(app) {

  // All the api endpoints
  /**
   * This method return the entire list of days, with their attached events.
   */
  app.get('/api/days', function(req, res) {
    connection.getDays(function(days) {
      res.send(days);
    })
  });

  /**
   * This method uploads an image to a temp dir on the server.
   */
  app.post('/api/images', [multer({ dest: './images/'})], function(req, res) {
    imageUtils.upload(req.files.file, function() {
      res.status(200).end();
    }, function() {
      res.status(400).send('Not an image file').end()
    });
  });

  /**
   * This method rejects an image which results in it being deleted.
   *
   * Expects the file name of the image.
   */
  app.post('/api/images/:image/reject', function(req, res) {
    imageUtils.delete(req.params.image, function() {
      res.status(200).end();
    }, function() {
      res.status(400).send('Not a valid image file that the system recognizes. Please check out the images page.').end()
    })
  });

  /**
   * This method approves an image which results in it being uploaded to flickr, then deleted.
   *
   * Expects the file name of the image.
   */
  app.post('/api/images/:image/approve', function(req, res) {
    if (!imageUtils.exists(req.params.image)) {
      res.status(400).send('Not a valid image file that the system recognizes. Please check out the images page.').end();
      return;
    }

    var error = function() {
      res.status(400).send('Something went wrong with flickr upload. Please contact your server administrator.');
    };

    imageUtils.uploadToFlickr(req.params.image, function() {
      imageUtils.delete(req.params.image, function() {
        res.status(200).end();
      }, error)
    }, error);
  });

  return app;
};

module.exports = {
  start: start
};

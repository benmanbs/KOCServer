var connection = require('./mysql.js');
var multer = require('multer');
var imageUploader = require('./imageUploader');

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
    imageUploader(req.files.file, function() {
      res.status(200).end();
    }, function() {
      res.status(400).send('Not an image file').end()
    });
  });

  return app;
};

module.exports = {
  start: start
};

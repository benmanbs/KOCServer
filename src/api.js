var connection = require('./mysql.js');

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

  return app;
};

module.exports = {
  start: start
};

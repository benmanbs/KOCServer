var sqlite = require('sqlite3');
var daysConverter = require('./daysConverter.js');

var db = new sqlite.Database('database.sqlite');

var getDays = function(callback) {
  db.all('SELECT * FROM sDay LEFT OUTER JOIN sEvent ON sDay.dayID = sEvent.dayNum WHERE sEvent.title IS NOT NULL ORDER BY sDay.dayID', function(err, rows) {
    if (err) {
      console.log(err);
      return;
    }

    var data = daysConverter.convert(rows);

    callback(data);
  });
};

module.exports = {
  getDays: getDays
};

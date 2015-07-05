var mysql = require('mysql');
var daysConverter = require('./daysConverter.js');

/**
 * Get the configuration details for the connection.
 *
 * @param local
 * @returns {{host: string, user: string, password: string, database: string}}
 */
var getConfigSettings = function(local) {
  if(local) {
    return {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'koc'
    };
  }

  return {};
};

// This is going to be a ghetto-ass singleton.
var connection;

if (!connection) {
  var connection =  mysql.createConnection(getConfigSettings(false));

  // Connect the sql connection;
  connection.connect();
}

var getDays = function(callback) {
  connection.query('SELECT * FROM sDay LEFT OUTER JOIN sEvent ON sDay.dayID = sEvent.dayNum WHERE sEvent.title IS NOT NULL ORDER BY sDay.dayID', function(err, rows, fields) {
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
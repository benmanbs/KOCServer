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

  return require('./Constants').mysqlOptions;
};

// This is going to be a ghetto-ass singleton.
// This is because multiple files may require in this connector,
// but we only want it to create one instance of connection.
var connection;

/**
 * Method to create the connection, and handle errors.
 *
 */
var handleDisconnect = function() {
  connection = mysql.createConnection(getConfigSettings(false)); // Recreate the connection, since
                                                                 // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
};

if (!connection) {
  handleDisconnect();
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

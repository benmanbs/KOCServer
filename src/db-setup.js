/**
 * This file sets up the database. If you already have a database file, it will
 * warn you that it's being overwritten.
 *
 * @author bshai date 8/16/16.
 */

var sqlite = require('sqlite3'),
    fs = require('fs'),
    requireText = require('require-text');

var databasePath = "database.sqlite";

var db = new sqlite.Database(databasePath);
var daysCreate = requireText('../scripts/days.sql', require);
var eventsCreate = requireText('../scripts/events.sql', require);
var daysInsert = requireText('../dumps/days.sql', require);
var eventsInsert = requireText('../dumps/events.sql', require);

var query = function(query) {
    return new Promise(function(resolve, reject) {
        db.run(query, function(err) {
            if (err) {
                reject();
            } else {
                resolve();
            }
        })
    });
};


// make sure db exists in right format

var queryPromise;

if (fs.existsSync('./' + databasePath)) {
    console.log('WARNING: Database already exists, overwriting the fucker.');
    queryPromise = query('DELETE FROM sDay; DELETE FROM sEvent;');
} else {
    console.log('Creating tables from scratch');
    queryPromise = query(daysCreate)
        .then(query(eventsCreate));
}

// load with data

console.log('loading with data....');
queryPromise
    .then(query(daysInsert))
    .then(query(eventsInsert));
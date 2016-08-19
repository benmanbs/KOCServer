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

var db;
var daysCreate = requireText('../scripts/days.sql', require);
var eventsCreate = requireText('../scripts/events.sql', require);
var daysInsert = requireText('../dumps/days.sql', require);
var eventsInsert = requireText('../dumps/events.sql', require);

var query = function(query) {
    return new Promise(function(resolve, reject) {
        db.run(query, function(err) {
            if (err) {
                console.log('Something went wrong executing query: ' + query + ".\n Error: " + err);
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
    db = new sqlite.Database(databasePath);
    console.log('WARNING: Database already exists, overwriting the fucker.');
    queryPromise = query('DELETE FROM sDay; DELETE FROM sEvent;');
} else {
    db = new sqlite.Database(databasePath);
    console.log('Creating tables from scratch');
    queryPromise = query(daysCreate)
        .then(query(eventsCreate));
}

// load with data

console.log('loading with data....');
queryPromise
    .then(query(daysInsert))
    .then(query(eventsInsert));
var _ = require('underscore');

/**
 * Converts a jason collection as it comes out of the sql query into
 * a collection in the format:
 * [
 *   {
 *     dayId,
 *     displayName,
       available,
       events: [
         title,
         time,
         hasMap,
         mapURL,
         eventID
       ]
 *   }
 * ]
 * @author bshai date 7/5/15.
 */
var convert = function(rows) {
    // initialize holder object
    var data = {};

    _.each(rows, function(row) {
        var item = data[row.dayID] || (data[row.dayID] = {
                dayID: row.dayID,
                displayName: row.displayName,
                available: row.available,
                events: []
            });

        item.events.push({
            title: row.title,
            time: row.time,
            hasMap: row.hasMap,
            mapURL: row.mapURL,
            eventID: row.eventID
        });
    });

    return _.values(data);
};

module.exports = {
    convert: convert
};

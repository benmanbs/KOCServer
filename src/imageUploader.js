var readChunk = require('read-chunk');
var imageType = require('image-type');
var fs = require('fs');

/**
 * This handles the image upload. It saves the image, renames
 * it to the current date stamp (so we can order them later), and
 * checks if it's a valid image.
 *
 * @author bshai date 7/5/15.
 */
var upload = function(file, success, err) {
    // Get the temporary location of the file
    var tmp_path = file.path;
    var buffer = readChunk.sync(tmp_path, 0, 12);

    // Check that it's a valid image type
    if(imageType(buffer)) {
        // Set where the file should actually exist
        target_path = "./images/" + new Date().getTime() + '.' + file.extension;

        // Move the file from the temporary location to the intended location
        fs.renameSync(tmp_path, target_path);

        success();
    } else {
        // Delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files.
        fs.unlink(tmp_path, function(err) {
            if (err)
                throw err;
        });
        err();
    }
};

module.exports = upload;
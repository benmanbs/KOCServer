var readChunk = require('read-chunk');
var imageType = require('image-type');
var fs = require('fs');

/**
 * This handles the image upload. It saves the image, renames
 * it to the current date stamp (so we can order them later), and
 * checks if it's a valid image.
 *
 * @param file
 * @param success
 * @param err
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

/**
 * Delete an image from our local file system. This is usually due to a rejection.
 *
 * @param fileName
 * @param success
 * @param error
 */
var deleteImage = function(fileName, success, error) {
    fs.unlink("./images/" + fileName, function(err) {
        if (err)
            error();
        else
            success();
    });
};

/**
 * Uploads a file to flickr. This is usually due to an approval.
 *
 * @param fileName
 * @param success
 * @param error
 */
var uploadToFlickr = function(fileName, success, error) {
    // TODO
};

var exists = function(fileName) {
    try {
        // Query the entry
        stats = fs.lstatSync(fileName);

        // Is it a file?
        if (stats.isFile()) {
            return true;
        }
    } catch (e) {
        return false;
    }
};

module.exports = {
    upload: upload,
    'delete': deleteImage,
    uploadToFlickr: uploadToFlickr,
    exists: exists
};
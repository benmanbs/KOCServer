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
var upload = function(file, success, error) {
    // Get the temporary location of the file
    var tmp_path = file.path;
    var buffer = readChunk.sync(tmp_path, 0, 12);

    // Check that it's a valid image type
    if(imageType(buffer)) {
        // Set where the file should actually exist
        target_path = "./images/" + new Date().getTime() + '.' + file.extension;

        // Move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if (err)
                error();
            else
                success();
        });

    } else {
        // Delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files.
        fs.unlink(tmp_path, function(err) {
            if (err)
                throw err;
        });
        error();
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

var exists = function(fileName, success, error) {
    // Query the entry
    fs.lstat(fileName, function(err, stats) {
        if (!err && stats.isFile())
            success();
        else
            error();
    });
};

var listAllImages = function(success, error) {
    fs.readdir('./images', function(err, files) {
        if (err) {
            error();
            throw err;
        }
        success(files);
    });
};

module.exports = {
    upload: upload,
    'delete': deleteImage,
    uploadToFlickr: uploadToFlickr,
    exists: exists,
    listAllImages: listAllImages
};
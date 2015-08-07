var readChunk = require('read-chunk');
var imageType = require('image-type');
var fs = require('fs');
var Flickr = require("flickrapi");
var _ = require('underscore');
var flickrOptions = {};

/**
 * This handles the image upload. It saves the image, renames
 * it to the current date stamp (so we can order them later), and
 * checks if it's a valid image.
 *
 * @param file
 * @param success
 * @param err
 */
var upload = function(file, success, error, prefix) {
    // Get the temporary location of the file
    var tmp_path = file.path;
    var buffer = readChunk.sync(tmp_path, 0, 12);

    // Check that it's a valid image type
    if(imageType(buffer)) {
        // Set where the file should actually exist
        target_path = '.' + prefix + '/images/' + new Date().getMonth() + '-' + new Date().getDate() + '-' + new Date().getTime() + '.' + file.extension;

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
var deleteImage = function(fileName, success, error, prefix) {
    fs.unlink('.' + prefix + '/images/' + fileName, function(err) {
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
var uploadToFlickr = function(fileName, success, error, prefix) {
    Flickr.authenticate(flickrOptions, function(err, flickr) {
        if (err) {
            error();
            return;
        }
        // we can now use "flickr" as our API object
        flickr.collections.getTree({
            collection_id: '134269899-72157656870766902',
            user_id: flickr.options.user_id
        }, function(err, response) {
            if (err) {
                error();
                return;
            }

            // Here is some crazy logic. First strip the upload day and month from the file name.
            var uploadMonth = +(fileName.split('-')[0]);
            var uploadDay = +(fileName.split('-')[1]);
            var IMAGE_EPOCH = 11;
            var albumTitleEnd = uploadDay - IMAGE_EPOCH;
            if (uploadMonth !== 7 || albumTitleEnd < 1 || albumTitleEnd > 8) {
                albumTitleEnd = "Party On!";
            } else {
                albumTitleEnd = albumTitleEnd.toString();
            }

            var albumId = _.find(response.collections.collection[0].set, function(item) {
                // Find an album that ends in albumTitleEnd
                return item.title.indexOf(albumTitleEnd, this.length - albumTitleEnd.length) !== -1;
            }).id;

            // Now that we have the album ID, first upload to flickr
            Flickr.upload({
                photos: [{
                    title: fileName,
                    tags: ['Kids of Courage'],
                    photo: '.' + prefix + '/images/' + fileName
                }]
            }, flickrOptions, function(err, response) {
                if (err) {
                    error();
                    return;
                }
                var newPhotoId = response[0];
                flickr.photosets.addPhoto({photoset_id: albumId, photo_id: newPhotoId}, function(err, response) {
                    if (err) {
                        error();
                        return;
                    }
                    success();
                })
            });
        });
    });
};

var exists = function(fileName, success, error, prefix) {
    // Query the entry
    fs.lstat('.' + prefix + '/images/' + fileName, function(err, stats) {
        if (!err && stats.isFile())
            success();
        else
            error();
    });
};

var listAllImages = function(success, error, prefix) {
    fs.readdir('.' + prefix + '/images', function(err, files) {
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
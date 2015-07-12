/**
 * @author bshai date 7/12/15.
 */
define([
    'backbone',

    'KOC/models/ImageModel'
], function (
    Backbone,

    ImageModel
) {
    'use strict';

    return Backbone.Collection.extend({
        model: ImageModel,
        url: '/api/images'
    });

});
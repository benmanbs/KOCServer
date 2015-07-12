/**
 * @author bshai date 7/12/15.
 */
define([
    'backbone'
], function (
    Backbone
) {
    'use strict';

    return Backbone.Model.extend({
        parse: function(data) {
            return {
                fullPath: data,
                name: data.split('.')[0]
            }
        }
    });

});
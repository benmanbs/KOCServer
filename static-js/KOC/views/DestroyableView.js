/**
 * @author bshai date 7/12/15.
 */
define([
    'backbone'
], function (
    Backbone
) {
    'use strict';

    return Backbone.View.extend({

        destroy: function() {
            // COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();
        }
    });

});
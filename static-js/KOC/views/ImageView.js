/**
 * @author bshai date 7/12/15.
 */
define([
    'jquery',

    'KOC/views/DestroyableView',

    'KOC/collections/ImageCollection',
    'text!KOC/templates/image.html'
], function (
    $,

    DestroyableView,

    ImageCollection,
    template
) {
    'use strict';

    return DestroyableView.extend({

        template: _.template(template),

        events: {
            'click #approve': '_approveHandler',
            'click #reject' : '_rejectHandler'
        },

        initialize: function(options) {
            this.image = options.image;
            this.collection = new ImageCollection();
            this.collection.fetch({reset: true});
            this.listenToOnce(this.collection, 'reset', this.getIndex);
        },

        /**
         * This function exists to get the index of the current image. That way
         * if the image is approved or rejected, we can just load the next image.
         */
        getIndex: function() {
            this.image = this.collection.findWhere({fullPath: this.image});
            this.index = this.collection.indexOf(this.image);
        },

        render: function() {
            this.$el.html(this.template({
                image: this.image
            }));
            return this;
        },

        _approveHandler: function() {
            this._fireCall('approve');
        },

        _rejectHandler: function() {
            this._fireCall('reject');
        },

        _fireCall: function(route) {
            var self = this;
            $.ajax('/api/images/' + this.image.get('fullPath') + '/' + route, { method: 'POST'})
                .done(function(data, textStatus, jqXHR) {
                    self.collection.fetch({reset:true});
                    self.listenToOnce(self.collection, 'reset', function() {
                        self.trigger('success', self.collection.at(self.index));
                    })
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    alert('Something went horribly wrong. Here is the error: ' + textStatus + ' ' + errorThrown);
                });
        }
    });

});
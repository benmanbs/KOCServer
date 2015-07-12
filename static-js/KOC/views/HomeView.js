/**
 * @author bshai date 7/12/15.
 */
define([
    'KOC/views/DestroyableView',

    'KOC/collections/ImageCollection',
    'text!KOC/templates/home.html'
], function (
    DestroyableView,

    ImageCollection,
    template
) {
    'use strict';

    return DestroyableView.extend({

        template: _.template(template),

        initialize: function(options) {
            this.collection = new ImageCollection();
            this.collection.fetch({reset: true});
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            this.$el.html(this.template({
                collection: this.collection
            }));
            return this;
        }
    });

});
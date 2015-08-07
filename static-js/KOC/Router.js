/**
 * @author bshai date 7/12/15.
 */
define([
    'backbone',

    'KOC/views/HomeView',
    'KOC/views/ImageView'
], function (
    Backbone,

    HomeView,
    ImageView
) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            'images/*image': 'imageRoute',
            '' : 'homeRoute'
        },

        homeRoute: function() {
            this.view && this.view.destroy();
            var homeView = this.view = new HomeView({el: '#content'});
            homeView.render();
        },

        imageRoute: function(image) {
            this.view && this.view.destroy();
            var imageView = this.view = new ImageView({el: '#content', image: image});
            imageView.render();
            var self = this;
            this.listenToOnce(imageView, 'success', function(image) {
                self.navigate('images/' + image.get('fullPath'), {trigger: true})
            });
            this.listenToOnce(imageView, 'noItems', function() {
                self.navigate('', {trigger: true})
            });
        }

    });

});
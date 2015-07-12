/**
 * @author bshai date 7/12/15.
 */
requirejs.config({
    baseUrl: '/static/js',
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        text: 'lib/text'
    }
});

require([
    'backbone',
    'KOC/Router'
], function(
    Backbone,
    Router
) {
    var router = new Router;
    Backbone.history.start();
});
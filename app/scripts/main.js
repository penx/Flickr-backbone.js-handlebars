/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars',
        moment: '../bower_components/moment/moment'
    }
});

require([
    'backbone', 'router', 'handlebars', 'moment'
], function (Backbone, AppRouter, Handlebars, moment) {
    new AppRouter();

    Handlebars.registerHelper({
        authorName: function(author) {
            return (/\(([^\)]*)\)/).exec(author)[1];
        },
        dateformat: function(date) {
            return moment(date).format('Do MMMM YYYY [at] HH:mm');
        }
    });

    Backbone.history.start();
});

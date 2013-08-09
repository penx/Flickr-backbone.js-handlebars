/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PhotoView = Backbone.View.extend({
        template: JST['app/scripts/templates/photo.hbs']
    });

    return PhotoView;
});
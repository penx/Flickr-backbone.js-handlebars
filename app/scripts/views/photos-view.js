/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PhotosView = Backbone.View.extend({
        template: JST['app/scripts/templates/photos.hbs']
    });

    return PhotosView;
});
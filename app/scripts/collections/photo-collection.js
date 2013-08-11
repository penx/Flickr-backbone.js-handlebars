/*jslint nomen: true, plusplus: true, browser: true, regexp: true */
/*global define*/

define([
    'backbone',
    'models/photo-model'
], function (Backbone, PhotoModel) {
    'use strict';

    var PhotoCollection = Backbone.Collection.extend({
        model: PhotoModel,
        tags: '',
        parse: function(response) {
            return response.items;
        },
        url: function() {
            return "http://api.flickr.com/services/feeds/photos_public.gne?" +
                (this.tags.length ? "&tags=" + encodeURIComponent(this.tags) + "&" : "") +
                "tagmode=all" +
                "&format=json" +
                "&jsoncallback=?";
        }
    });
    return PhotoCollection;
});
/*global define*/

define([
  'underscore',
  'backbone',
  'models/photo-model'
], function (_, Backbone, PhotoModel) {
  'use strict';

  var PhotoCollection = Backbone.Collection.extend({
    model: PhotoModel,
    tags: '',
    parse: function(response) {
      console.log(response);
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
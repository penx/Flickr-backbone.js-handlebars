/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'bootstrap',
    './photo-view'
], function ($, _, Backbone, JST, bootstrap, PhotoView) {
    'use strict';
    var PhotosView = Backbone.View.extend({
        template: JST['app/scripts/templates/photos.hbs'],
        el: $("#content"), 
        render: function() {
        	if(this.collection) {
	        	this.$el.html(this.template({collection: this.collection.toJSON()}));
        	} else {
	        	this.$el.html(this.template({}, {helpers: this.helpers}));
        	}
        },
        events: {
        	"click .open-photo" : "open"
        },
        open: function(e) {
        	e.preventDefault();
            var photoView = new PhotoView( {model : this.collection.models[$(e.currentTarget).attr('href').substr(1)] });
            photoView.render();
        } 
    });

    return PhotosView;
});
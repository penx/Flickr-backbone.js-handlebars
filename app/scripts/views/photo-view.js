/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';
    var PhotoView = Backbone.View.extend({
        template: JST['app/scripts/templates/photo.hbs'],
        el: $("#content"),
        modalWindow : null,
        render: function() {
        	var modalTemplate = this.template(this.model.toJSON(), {helpers: this.helpers}),
	        	modalWindow = this.$el.append(modalTemplate).find('.modal');
        	this.modalWindow = modalWindow;

        	this.modalWindow.on('hidden.bs.modal', function(){
        		modalWindow.remove();
        	}).modal();
        },
        close: function() {
        	this.modalWindow.modal('hide');
        },
        events: {
        	"click a[href^=#]" : "close"
        },
     	helpers: {
        	//TODO: move this into generic helpers
	        dateformat: function(date) {
	        	return date + "TODO: format";
	        },
	        photoDescription: function(html) {
	        	return new Handlebars.SafeString($($.parseHTML(html)).find('>:first-child').remove().html());
	        },
	        eachTag: function(tags, block) {
        	    var tagHtml = '',
        	    tagArray = tags.split(" ");

				for(var n = 0; n < tagArray.length; n++) {
			        tagHtml += block.fn(tagArray[n]);					
				}
			    return tagHtml;
	        }
        }
    });

    return PhotoView;
});
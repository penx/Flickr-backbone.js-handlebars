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
        el: $("#overlay"), 
        render: function() {
        	var modalTemplate = this.template(this.model.toJSON(), {helpers: this.helpers}),
	        	modalWindow;
	        //twitter bootstrap moves modal html outside of view element, remove previous modals from the dom before creating a new one:
	        $('body > .modal, body > .modal-backdrop').remove();
        	this.$el.html(modalTemplate).find('.modal').modal();
        },
        close: function() {
        	this.$el.find('.modal').modal('hide');
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
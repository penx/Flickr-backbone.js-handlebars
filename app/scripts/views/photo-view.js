/*jslint nomen: true, plusplus: true, browser: true, regexp: true */
/*global define*/

define([
    'jquery',
    'backbone',
    'templates',
    'handlebars',
    'bootstrap'
], function ($, Backbone, JST, Handlebars) {
    'use strict';
    var PhotoView = Backbone.View.extend({
        template: JST['app/scripts/templates/photo.hbs'],
        el: $("#overlay"),
        render: function() {
            var modalTemplate = this.template(this.model.toJSON(), {helpers: this.helpers});
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
            photoDescription: function(html) {
                var descContent = $('<div></div>').append($.parseHTML(html));
                descContent.find('>p:first-child, >p:nth-child(2)').remove();
                return new Handlebars.SafeString(descContent.html());
            },
            eachTag: function(tags, block) {
                var tagHtml = '',
                    tagArray = tags.split(" "),
                    n;
                for (n = 0; n < tagArray.length; n++) {
                    tagHtml += block.fn(tagArray[n]);
                }
                return tagHtml;
            }
        }
    });

    return PhotoView;
});
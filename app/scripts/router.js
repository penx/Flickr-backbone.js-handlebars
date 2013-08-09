/*global define*/

define([
    'jquery',
    'backbone',
    'views/photos-view',
    'collections/photo-collection'
], function ($, Backbone, PhotosView, PhotoCollection) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "defaultRoute",
            "tag/:id": "photos"
        },
        defaultRoute: function() {
            return this.photos('');
        },
        photos: function(params) {
            var photosView = new PhotosView({collection: this.photoCollection}),
                photoCollection = new PhotoCollection();
            photoCollection.tags = params;

            //render empty first
            photosView.render();
            photoCollection.fetch({
                success: function() {
                    photosView.collection = photoCollection;
                    photosView.render();
                }
            });
        }
    });
    return AppRouter;
});
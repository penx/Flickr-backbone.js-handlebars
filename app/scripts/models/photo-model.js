/*jslint nomen: true, plusplus: true, browser: true, regexp: true */
/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var PhotoModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return PhotoModel;
});
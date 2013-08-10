#Flickr-backbone.js-handlebars

A simple client for the Flickr Public API using Backbone.js, Handelbars, RequireJS, Twitter Bootstrap and Yeoman.


## Installation

To download and run this site, use the following commands:

TODO:

## Tutorial

###Install prerequisites

Install node.js and npm from http://nodejs.org

Install Ruby and gem from http://www.ruby-lang.org

Install yeoman, backbone-generator and compass using:

	npm install -g yo
	npm install -g generator-backbone
	gem install compass

###Setup a new project

From the command line, from the folder you want to create the new project, call the following and answer yes to Twitter Bootstrap and RequireJS:

	yo backbone --template-framework=handlebars

Use yeoman to create models, collections, views and routers:

	yo backbone:model photo
	yo backbone:collection photo
	yo backbone:view photo
	yo backbone:view photos
	yo backbone:router router

Add JavaScript library dependencies with bower, edit bower.json and add:

    "moment": "~2.1.0"

Then run:

	bower install momentjs

Clean up the sample content from index.html, add an id to the container and add a new container for an overlay i.e.:

	<div class="container" id="content">
	</div>
    <div id="overlay">
    </div>

Move the router from app/scripts/routes/router-router.js to app/scripts/router.js and delete the routes directory.


###Upgrade to Bootstrap 3.0
(this step can be skipped)

At the time of writing, bootstrap 2.3.2 is installed by the yeoman generator. There are some issues with Bootstrap's modal dialog on mobile devices that are fixed in 3.0RC, so we're going to upgrade by editing bower.json and adding another dependency:

    "bootstrap": "~3.0.0"

We can also remove:

    "sass-bootstrap": "~2.3.0",

And we can comment out the first 2 lines in app/styles/main.scss, :

	// $iconSpritePath: '/images/glyphicons-halflings.png';
	// @import 'sass-bootstrap/lib/bootstrap';

###Start coding

Inside app/scripts, edit the following files and make the changes listed to match the contents of the code in this repository:

* collections/photo-collection.js

	- The url of the photo feed.
	- A parse function to select a child object from the response to get the collection we want.

* templates/photo.hbs

	- A bootstrap modal-dialog to display a single photo

* templates/photos.hbs

	- a bootstrap media-list containing a collection of photos

* views/photo-view.js

	- add a render function to show the modal dialog, as we're using Bootstrap we also have to clean up any previous modal dialogs:

			render: function() {
	        	var modalTemplate = this.template(this.model.toJSON(), {helpers: this.helpers}),
		        	modalWindow;
		        $('body > .modal, body > .modal-backdrop').remove();
	        	this.$el.html(modalTemplate).find('.modal').modal();
	        }

	- set the element we're appending to to $("#content")
	- add some helpers used by the handlebars template 

* views/photos-view.js

	- pass in bootstrap and the photo-view
	- set the element we're appending to to $("#content")
	- add a render function that passes the collection (if it exists) to the handlebars template
	- add an 'open' event and us it to load the photo-view (modal window)
	- add some helpers used by the handlebars template 

* main.js

	- pass in and initialise the router and Handlebars helpers:

			require([
			    'backbone', 'router', 'handlebars', 'moment'
			], function (Backbone, AppRouter, Handlebars, Moment) {
			    var router = new AppRouter;

			    Handlebars.registerHelper( {
			    	...
			    });

			    Backbone.history.start();
			});

* router.js
	- add two routes:

			routes: {
			    "": "defaultRoute",
			    "tag/:id": "photos"//,
			},
			defaultRoute: function() {
			    return this.photos('');
			},
			photos: function(params) {
			    var photosView = new PhotosView({collection: this.photoCollection}),
			        photoCollection = this.photoCollection;
			    photoCollection.tags = params;
	            photosView.render();
			    photoCollection.fetch({
			        success: function() {
			            photosView.collection = photoCollection;
			            photosView.render();
			        }
			    });
			}

    - pass in 'views/photos-view' and 'collections/photo-collection'

Finally, build and run the project

	grunt server


##Creating a production ready site

TODO:
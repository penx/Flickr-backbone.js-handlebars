#Flickr-backbone.js-handlebars

A simple client for the Flickr Public API using Backbone.js, Handlebars, RequireJS, Twitter Bootstrap and Yeoman.

## Installation

###Prerequisites
To download and run this site, install these prerequisites manually:

- node.js and npm from http://nodejs.org
- Ruby and gem from http://www.ruby-lang.org

Install compass using:

	gem install compass

###Clone, build and run
Use the following commands:

	git clone https://github.com/penx/Flickr-backbone.js-handlebars.git
	cd Flickr-backbone.js-handlebars
	npm install
	bower install
	grunt server

## Tutorial

###Install prerequisites

Install the following manually:

- node.js and npm from http://nodejs.org
- Ruby and gem from http://www.ruby-lang.org

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

At the time of writing, bootstrap 2.3.0 is installed by the yeoman generator. There are some issues with Bootstrap's modal dialog on mobile devices in 2.3.0 that are fixed in 3.0RC, so we're going to upgrade by editing bower.json and adding another dependency:

    "bootstrap": "~3.0.0"

We can also remove:

    "sass-bootstrap": "~2.3.0",

Comment out the first 2 lines in app/styles/main.scss, :

	// $iconSpritePath: '/images/glyphicons-halflings.png';
	// @import 'sass-bootstrap/lib/bootstrap';

Add a link to the bootstrap stylesheet in app/index.html:

    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">

Finally, change the path to bootstrap in app/scripts/main.js 

    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',


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

###Compiling
There was a minor bug in the yeoman generator/backbone [which I think](https://github.com/yeoman/generator-backbone/issues/112) [has now been fixed](https://github.com/yeoman/generator-backbone/commit/2d962e711f8a390a429ddbf224902dfd454eb195), in order to compile for production I had to:

1. edit Gruntfile.js and comment out the line:

		// wrap: true

2. compile using `grunt` or compile and run using `grunt server:dist`


###Routes/URLs to photos

At the moment, the main feed and tag feeds have a unique route in the application, which is bookmarkable. Individual photos do not, as the Flickr public feed does not provide a unique ID or a way of loading an individual photo by ID. In order to have a route to photos, you could consider implementing the full [Flickr API](http://www.flickr.com/services/api/).

###Twitter Bootstrap
The full Twitter bootstrap has been used, but only a small part of it is used. If using in production you should consider using a [customised version](http://getbootstrap.com/customize/) (disabled for RC3.0).

Alternatively, the site styles and modal dialog script could easily be rewritten, removing the need for Bootstrap altogether.

###Server side rendering
Server side rendering will speed up initial page loads and SEO, which for a production site can bevery important. You can consider technologies such as [Hogan.js](http://twitter.github.io/hogan.js/) to render Mustache templates on the server, or [rendr](https://github.com/airbnb/rendr) and [Meteor](http://www.meteor.com) to render Backbone.js apps on the server. Alternatively, [Derby](http://derbyjs.com) is another MVC framework that allows server side rendering.
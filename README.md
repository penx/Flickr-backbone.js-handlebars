#Flickr-backbone.js-handlebars

A simple client for the Flickr Public API using Backbone.js, Handelbars, RequireJS, Twitter Bootstrap and Yeoman.


## Installation

To download and run this site, use the following commands:

TODO:

## Tutorial

###Install prerequisites

* Install node.js and npm - http://nodejs.org
* Install Ruby and gem - http://www.ruby-lang.org
* Install yeoman, backbone-generator and compass using:

		npm install -g yo
		npm install -g generator-backbone
		gem install compass

###Setup a new project

	cd ~/project-path
	yo backbone --template-framework=handlebars

answer yes to Twitter Bootstrap and RequireJS

	yo backbone:model photo
	yo backbone:collection photo
	yo backbone:view photo
	yo backbone:view photos
	yo backbone:router router

* If you're using Sublime, open the project path and save as a new project
* Edit the sublime-project file and set the path to './app'
* If using source control, remember to ignore the .sublime-workspace file
* Clean up the sample content from index.html and add an id to the container, i.e.:

		<div class="container" id="content">
		</div>

* Move the router from /app/scripts/routes/router-router.js to /app/scripts/router.js and delete the routes directory
* Now's a good time to check in to source control


* Edit the following files, and make the following changes to match the contents of this repository:


	* /app/scripts/collections/photo-collection.js

		* the url of the photo feed
		* a parse function to select a child object from the response to get the collection we want


	* /app/scripts/templates/photo.hbs

		- a bootstrap modal-dialog to display a single photo

	* /app/scripts/templates/photos.hbs

		- a bootstrap media-list containing a collection of photos

	* /app/scripts/views/photo-view.js

		 - add a render function to show the modal dialog:

			    render: function() {
			    	var modalWindow = this.template(this.model.toJSON(), {helpers: this.helpers});
			    	this.$el.append(modalWindow).find('.modal').on('hidden.bs.modal', function(){
			    		$(this).remove();
			    	}).modal();
			    }

		 - set the element we're appending to to $("#content")
		 - add some helpers used by the handlebars template 

	* /app/scripts/views/photos-view.js

		- pass in bootstrap and the photo-view
		- set the element we're appending to to $("#content")
		- add a render function that passes the collection (if it exists) to the handlebars template
		- add an 'open' event and us it to load the photo-view (modal window)
		- add some helpers used by the handlebars template 

	* /app/scripts/main.js

		- pass in and initialise the router:

			require([
			    'backbone', 'router'
			], function (Backbone, AppRouter) {
			    var router = new AppRouter;
			    Backbone.history.start();
			});

	* /app/scripts/router.js
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
				    photoCollection.fetch({
				        success: function() {
				            photosView.collection = photoCollection;
				            photosView.render();
				        }
				    });
				}

	    - pass in 'views/photos-view' and 'collections/photo-collection'


* Finally, run `grunt server`


##Creating a production ready site

TODO:
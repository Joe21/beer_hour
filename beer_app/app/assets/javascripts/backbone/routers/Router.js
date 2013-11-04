var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		'': 'index'
	},

	initialize: function(){
		this.maps = new app.MapList([
			new app.Map({map: world_map})
		]);
	},

	index: function(){
		app.app_view = new AppView({collection: this.maps});
		app.app_view.render();
	}
});
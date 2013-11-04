var app = app || {};

app.MapView = Backbone.View.extend({
	el: $('main'),

	initialize: function() {
	
	},

	render: function(){
		var template = Handlebars.compile($('#app-view-template').html());
		this.$el.html(template(this.model.toJSON()));
	}
});
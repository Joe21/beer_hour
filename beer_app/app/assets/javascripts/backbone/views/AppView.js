var app = app || {};

app.AppView = Backbone.View.extend({
	el: $('#main'),

	initialize: function(){
		this.$el.html($('#app-view-template').html());
	},

	render: function(){
		this.collection.each(function(maps){
			var view = new app.Maps({model: map});
			this.$list.append(view.render().el);
		}, this);
		return this;
	}
});
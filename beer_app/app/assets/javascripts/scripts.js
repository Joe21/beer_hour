var return_data;

my_func = function(){

	$.ajax({
		dataType: 'json',
		method: 'GET',
		url: '/beer_feed',
	}).done(function(data){
		return_data = data;
	});
};
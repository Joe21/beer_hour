class BeerController < ApplicationController

	def index
		ig_client_id = ENV['INSTAGRAM_CLIENT_ID']
		url = "https://api.instagram.com/v1/tags/beerporn/media/recent?client_id=#{ig_client_id}"
		response = HTTParty.get(url)
		render :json => @response
		images = @response.data.photo.images.standard_resolution.url

	end	

	def beer_feed
		ig_client_id = ENV['INSTAGRAM_CLIENT_ID']
		url = "https://api.instagram.com/v1/tags/beerporn/media/recent?client_id=#{ig_client_id}"
		@response = HTTParty.get(url)
		render :json => @response
		puts @response
	end

end
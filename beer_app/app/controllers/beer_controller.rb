class BeerController < ApplicationController

	def index
	end	

	def beer_feed

# Back stuff
		ig_client_id = ENV['INSTAGRAM_CLIENT_ID']
		url = "https://api.instagram.com/v1/tags/beerporn/media/recent?client_id=#{ig_client_id}"
		@response = HTTParty.get(url)
		
		@response["data"].each do |res|
			if res["location"] && res["location"]["latitude"] && res["location"]["longitude"] && res["images"] && res["images"]["standard_resolution"] && res["images"]["standard_resolution"]["url"] 
				
				latitude = res["location"]["latitude"]
				longitude = res["location"]["longitude"]
				url = res["images"]["standard_resolution"]["url"]

				@beers = Beer.create(tag: "beerporn", latitude: latitude, longitude: longitude, url: url)
			end
		end

# Send back
		# render :json => Beer.find
		# @response.to_json
		render :json => @beers
	end

end


# @response.each do |instance|

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

	 	beers = Beer.desc(:_id).limit(10)

	 	formatted_beers = beers.map do |beer|
	 		{latitude: beer.latitude.to_f, longitude: beer.longitude.to_f, url: beer.url.to_s}
	 	end

		render :json => formatted_beers.to_json

		

		# @response.to_json
	end

end

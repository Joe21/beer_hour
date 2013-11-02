BeerApp::Application.routes.draw do
  
root :to => "beer#index"

get '/beer_feed' => "beer#beer_feed"


end

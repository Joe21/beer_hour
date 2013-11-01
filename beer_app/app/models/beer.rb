class Beer
  include Mongoid::Document
  field :tag, type: String
  field :latitude, type: String
  field :longitude, type: String
  field :url, type: String
end

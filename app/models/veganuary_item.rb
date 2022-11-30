require 'open-uri'
require 'net/http'



class VeganuaryItem < ApplicationRecord
  has_one_attached :company_logo
  has_one_attached :offer_images1
  has_one_attached :offer_images2
  has_one_attached :offer_images3
  has_many_attached :offer_images

  def self.category_options
    ["cafe", "foodtruck", "service", "online_shop", "restaurant", "take_away", "shop", "chain_of_stores", "else"]
  end

  before_save :add_cantons

  def add_cantons

    cantons_string = ""

    self.addresses.split("\n").each do |line|
      unless line.blank? || line.scan(/[0-9]{4}/).empty?
        plz = line.scan(/[0-9]{4}/).first

        uri = URI("https://swisspost.opendatasoft.com/api/records/1.0/search/?dataset=plz_verzeichnis_v2&q=postleitzahl%3D#{plz}&facet=postleitzahl&facet=plz_zz&facet=ortbez18")
        #params = { :limit => 10, :page => 3 }
        #uri.query = URI.encode_www_form(params)

        res = Net::HTTP.get_response(uri)
        #puts res.body if res.is_a?(Net::HTTPSuccess)
        res_json = JSON.parse(res.body)
        puts res_json["records"][0]["fields"]["kanton"]

        cantons_string = cantons_string + " " + res_json["records"][0]["fields"]["kanton"]

      end
    end

    self.cantons = cantons_string

  end

end

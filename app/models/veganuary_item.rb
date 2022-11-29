class VeganuaryItem < ApplicationRecord
  has_one_attached :company_logo
  has_one_attached :offer_images1
  has_one_attached :offer_images2
  has_one_attached :offer_images3
  has_many_attached :offer_images

  def self.category_options
    ["cafe", "foodtruck", "service", "online_shop", "restaurant", "take_away", "shop", "chain_of_stores", "else"]
  end

end

class VeganuaryItem < ApplicationRecord
  has_one_attached :company_logo
  has_many_attached :offer_images

  def self.category_options
    ["cafe", "foodtruck", "service", "online_shop", "restaurant", "take_away", "shop"]
  end

end

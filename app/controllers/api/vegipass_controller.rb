module Api
  class VegipassController < Api::ApplicationController
    def used_offers
      @offers = []
      render json: @offers
    end
  end
end

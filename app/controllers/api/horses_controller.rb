module Api
  class HorsesController < Api::ApplicationController
    def index
      @horses = Horse.all
      render json: @horses
    end
  end
end

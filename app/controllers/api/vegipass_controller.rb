module Api
  class VegipassController < Api::ApplicationController

    def used_offers
      @offers = []
      render json: @offers
    end

    def am_i_logged_in
      answer = {answer: "yes, you are logged in", email: current_user.email}
      render json: answer
    end

  end
end


class ApiController < ApplicationController
  require 'rest-client'
  def google_sheets

     response = RestClient::Request.execute(
      method: :get,
      url: 'https://sheets.googleapis.com/v4/spreadsheets/13R8_eqxZda-1XHy66EQKnIiRRjDGwdyBfdLNGuatRTw/values:batchGet',
      headers: {
        params: {
          key: Rails.application.credentials[:google_sheets_api_key],
          ranges: "A:B"
          }
        }
      )

    #headers: {api_key: ENV['GOOGLE_SHEETS_API_KEY']})
    render json: response
  end

  def vegan_cockpit_js
    render file: Rails.root.join('app', 'assets', 'javascript', 'vegan.cockpit.js'), layout: false
    #render file: '/app/assets/javascript/vegan_cockpit.js', layout: false
  end
end

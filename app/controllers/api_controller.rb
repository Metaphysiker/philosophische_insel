
class ApiController < ApplicationController
  protect_from_forgery except: [:vegan_cockpit_js, :d3_charts_js]
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
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || 'https://vegan.ch/' # the domain you're making the request from
    #response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    render file: "#{Rails.root}/app/javascript/packs/vegan_cockpit.js", layout: false
  end

  def d3_charts_js
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || 'https://vegan.ch/' # the domain you're making the request from
    #response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    render file: "#{Rails.root}/app/javascript/packs/d3-charts.js", layout: false
  end

end


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

  def vegan_visit
    #response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || 'https://vegan.ch/' # the domain you're making the request from
    #response.headers['Access-Control-Allow-Origin'] = '*'
    #response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    #response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, Auth-Token, Email, X-User-Token, X-User-Email'

    url = "nothing"
    cookie = "nothing"

    url = params[:url]
    cookie = params[:cookie]

    VeganVisit.create(url: url, cookie: cookie)

    head :no_content
  end

end

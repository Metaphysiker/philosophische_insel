
class ApiController < ApplicationController
  protect_from_forgery except: [:vegan_cockpit_js, :d3_charts_js, :vegipass_offers, :random_dates_from_this_month]
  require 'rest-client'

  def random_dates_from_this_month
    free_slots = []

    start_date = Date.today.beginning_of_month
    end_date = Date.today.end_of_month

      (start_date..end_date).each do |day|
        rand(7..10)
        free_slots.push(
          {
            start_time: DateTime.parse(day.to_s + "T" + "0#{rand(7..9)}:00"),
            end_time: DateTime.parse(day.to_s + "T" + "#{rand(17..19)}:00")
          }
        )
      end

    render json: free_slots
  end

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

  def vegipass_offers
    offers = [
      {
        company: "Affechrut",
        content: "Bombastische Gewürze und pflanzliche Fleischalternativen – das ist der Beitrag von Affechrut, damit du etwas für deine Gesundheit, den Klimawandel, die Schonung der natürlichen Ressourcen und den Tierschutz tun kannst, ohne auf Genuss verzichten zu müssen.",
        offer: "25% Rabatt auf eine Bestellung im Onlineshop",
        image_url: ActionController::Base.helpers.image_url("affechrut.webp")
      },
      {
        company: "ENGEL-TOFU",
        content: "Engel-Tofu kann sich die älteste Tofuproduktionsstätte der Deutschschweiz nennen und garantiert durch die traditionelle, schonende handwerkliche Fertigung die einzigartige Engel-Tofu Qualität. In ihrem vielfältigen Sortiment, vom Tofu nature, Tofu-Sticks, Tofu-Spiessli über den geräucherten Tofu hin zum Tofu mit Zwiebelsprossen, Soja-Paneer oder Weizen- und Dinkel-Seiten, findest du genau das Richtige um in deine Pfanne zu hauen. Die Genossenschaft hält sich seit 1982 an ihre ethischen und ökologischen Statuten. Überzeuge dich jetzt vom besten Schweizer Tofu!",
        offer: "10.- Rabatt ab einem Einkauf von 20.- im Online-Shop",
        image_url: ActionController::Base.helpers.image_url("engeltofu.jpg")
      },
      {
        company: "SESH",
        content: "Bei Sesh findest du leckere Bowls und eine grosse Portion Gelassenheit. Mache eine Pause vom aktiven Alltag und lade deine Batterien wieder auf. Sie servieren dir naturbelassene, frische Zutaten, raffiniert zusammengesetzt. Be bowld!",
        offer: "normaler Gastronomierabatt direkt im Restaurant oder 30% Rabatt auf deine Online Bestellung auf sesh.ch/shop: nur Abholung vor Ort, VegiPass vorzeigen.",
        image_url: ActionController::Base.helpers.image_url("sesh.png")
      }
    ]

    render json: offers
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

  def search_game_embed
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    if params[:cookie].present?
      @cookie = params[:cookie]
    else
      @cookie = ""
    end

    if params[:identifier].present?
      @identifier = params[:identifier]
    else
      @identifier = "1"
    end

    @total_findables = SearchGame.count_of_findables

    @you_found_all = (@total_findables - SearchGame.where(cookie: @cookie).where(identifier: @identifier).distinct.count) == 0

    @already_submitted = SearchGameSubmission.where(cookie: @cookie).present?

    @you_already_found_me = SearchGame.where(cookie: @cookie).where(identifier: @identifier).present?

    @count_of_findables = SearchGame.count_of_findables - SearchGame.where(cookie: @cookie).where(identifier: @identifier).distinct.count

    if SearchGame.where(cookie: @cookie).where(identifier: @identifier).empty?

    else
      @text = "Du hast mich schon gefunden!"
    end

    render layout: "application_empty"
  end

  def search_game_embed_old
    #response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || 'https://vegan.ch/' # the domain you're making the request from
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM https://vegan.ch/"

    if params[:cookie].present?
      @cookie = params[:cookie]
    else
      @cookie = ""
    end

    if params[:text].present?
      @text = params[:text]
    else
      @text = "Klick mich!"
    end

    if params[:identifier].present?
      @identifier = params[:identifier]
    else
      @identifier = "1"
    end

    @count_of_findables = SearchGame.count_of_findables - SearchGame.where(cookie: @cookie).where(identifier: @identifier).distinct.count

    if SearchGame.where(cookie: @cookie).where(identifier: @identifier).empty?

    else
      @text = "Du hast mich schon gefunden!"
    end

    render layout: "application_empty"
  end

  def search_game_find

    status = "error"

    if SearchGame.where(cookie: params[:cookie]).where(identifier: params[:identifier]).empty?
      SearchGame.create(cookie: params[:cookie], identifier: params[:identifier])
      status = "success"
    else
      status = "untouched"
    end

    how_many_left_to_find = SearchGame.count_of_findables - SearchGame.where(cookie: params[:cookie]).where(identifier: params[:identifier]).distinct.count

    answer = {
      status: status,
      how_many_left_to_find: how_many_left_to_find,
      how_many_left_to_find_text: "Finde noch die anderen #{how_many_left_to_find} Weihnachtsmänner!"
    }

    render json: answer
  end

end

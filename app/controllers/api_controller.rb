
class ApiController < ApplicationController
  protect_from_forgery except: [:vegan_cockpit_js, :d3_charts_js, :vegipass_offers]
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

  def vegipass_offers
    offers = [
      {
        company: "Affechrut",
        content: "Bombastische Gewürze und pflanzliche Fleischalternativen – das ist der Beitrag von Affechrut, damit du etwas für deine Gesundheit, den Klimawandel, die Schonung der natürlichen Ressourcen und den Tierschutz tun kannst, ohne auf Genuss verzichten zu müssen.",
        offer: "25% Rabatt auf eine Bestellung im Onlineshop"
      },
      {
        company: "ENGEL-TOFU",
        content: "Engel-Tofu kann sich die älteste Tofuproduktionsstätte der Deutschschweiz nennen und garantiert durch die traditionelle, schonende handwerkliche Fertigung die einzigartige Engel-Tofu Qualität. In ihrem vielfältigen Sortiment, vom Tofu nature, Tofu-Sticks, Tofu-Spiessli über den geräucherten Tofu hin zum Tofu mit Zwiebelsprossen, Soja-Paneer oder Weizen- und Dinkel-Seiten, findest du genau das Richtige um in deine Pfanne zu hauen. Die Genossenschaft hält sich seit 1982 an ihre ethischen und ökologischen Statuten. Überzeuge dich jetzt vom besten Schweizer Tofu!",
        offer: "10.- Rabatt ab einem Einkauf von 20.- im Online-Shop"
      },
      {
        company: "SESH",
        content: "Bei Sesh findest du leckere Bowls und eine grosse Portion Gelassenheit. Mache eine Pause vom aktiven Alltag und lade deine Batterien wieder auf. Sie servieren dir naturbelassene, frische Zutaten, raffiniert zusammengesetzt. Be bowld!",
        offer: "normaler Gastronomierabatt direkt im Restaurant oder 30% Rabatt auf deine Online Bestellung auf sesh.ch/shop: nur Abholung vor Ort, VegiPass vorzeigen."
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

end

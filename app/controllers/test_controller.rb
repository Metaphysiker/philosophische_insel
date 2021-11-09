class TestController < ApplicationController
  if Rails.env.development?

    def generate_json_of_translation
      locale = YAML.load_file('config/locales/de.yml')
      File.write("cypress/fixtures/locales/de.json", locale.to_json)

      locale = YAML.load_file('config/locales/models.de.yml')
      File.write("cypress/fixtures/locales/models.de.json", locale.to_json)

      head :ok
    end

    def create_donations_json_only

      name_of_file = "donations_json_only"
      if params["name_of_file"].present?
        name_of_file = params[:name_of_file]
      end

      user_json = []
      10.times do
        user = OpenStruct.new(
          email: Faker::Internet.unique.email,
          password: "password",
          password_confirmation: "password"
        )
        user_json.push(user.to_h)
      end

      File.write("cypress/fixtures/#{name_of_file}.json", user_json.to_json)
      head :ok
    end

  end
end

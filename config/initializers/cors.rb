Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://vegan.ch'
    resource '/api/vegan_visit', headers: :any, methods: [:get, :post, :patch, :put, :options]
  end
end

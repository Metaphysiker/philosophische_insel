Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://vegan.ch'
    resource '/api/vegan_visit', headers: :any, methods: [:get, :post, :patch, :put, :options]
  end

  allow do
    origins '*'
    resource '/api/vegipass_offers', headers: :any, methods: [:get]
  end

  allow do
    origins '*'
    resource '/api/random_dates_from_this_month', headers: :any, methods: [:get]
  end

  allow do
    origins '*'
    resource '/api/horses', headers: :any, methods: [:get]
  end

  allow do
    origins '*'
    resource '/oauth/token', headers: :any, methods: [:get, :post]
    resource '/oauth/revoke', headers: :any, methods: [:get, :post]
  end

  allow do
    origins '*'
    resource '/api/vegipass/am_i_logged_in', headers: :any, methods: [:get]
  end

  allow do
    origins 'https://www.philosophie.ch'
    resource '/philosophy_reviews/get_html_of_all_philosophy_reviews', headers: :any, methods: [:get]
  end

  allow do
    origins '*'
    resource '/veganuary_items/', headers: :any, methods: [:get, :post]
  end

end

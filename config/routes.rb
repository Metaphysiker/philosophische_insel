
Rails.application.routes.draw do

  resources :veganuary_items do
    member do
      get 'edit_for_user'
      patch 'update_for_user'
    end
    collection do
      get 'new_veganuary_item'
      get 'search_veganuary_items'
      get 'all_items'
      get 'published_items'
      get 'checked_items'
      get 'checked_items_html'
      get 'random_item_html'
      get 'random_item_horizontal_html'
      get 'get_coordinates'
      post 'checked_items_html'
    end
  end
  resources :search_game_submissions
  resources :search_games
  resources :worker_workdays
  resources :work_days do
    collection do
      post 'generate_work_plan'
    end
  end
  resources :workers
  resources :horse_comments
  use_doorkeeper do
    skip_controllers :authorizations, :applications, :authorized_applications
  end

  namespace :api do
    resources :horses, only: %i[index]
    get 'search_game_embed'
    post 'search_game_find'
  end

  namespace :api do
    resources :vegipass do
      collection do
        get 'am_i_logged_in'
      end
    end
  end

  resources :horses do
    collection do
     get 'get_odt_of_horses'
     get 'get_pdf_of_horses'
     get 'get_word_of_horses'
    end
    member do
      post 'shoeing_happened_today'
    end
  end
  resources :vegan_visits do
    collection do
      get 'analytics'
    end
  end
  resources :media
  resources :media_releases
  get 'api/vegipass_offers'
  get 'api/google_sheets'
  get 'api/vegan_cockpit_js'
  get 'api/d3_charts_js'
  get 'api/random_dates_from_this_month'
  post 'api/vegan_visit', to: 'api#vegan_visit', as: "api_vegan_visit"
  resources :philosophy_reviews do
    collection do
      get 'iframe'
      get 'get_all_philosophy_reviews'
      get 'get_html_of_all_philosophy_reviews'
      #get 'current_table'
    end
  end
  resources :donation_projects do
    member do
      get 'bar_chart_data'
      get 'pferdefutter_data'
    end
  end
  resources :donations
  get 'chat', to: 'chat#chat', as: "chat"
  root 'static_pages#welcome'
  get 'static_pages/welcome'
  get 'static_pages/work_plan'
  get 'static_pages/rmagick'
  get 'static_pages/donation_buttons'
  get 'static_pages/compare_lists'

  get 'static_pages/survival_game'

  get 'static_pages/download_public_file', as: "download_public_file"

  get 'serial_letter', to: "static_pages#serial_letter", as: "serial_latter"
  post 'serial_letter', to: "static_pages#serial_letter_upload_csv", as: "serial_letter_upload_csv"


  get 'claudia_login', to: "static_pages#claudia_login"
  get 'marina_login', to: "static_pages#marina_login"

  get 'claudia_dashboard', to: "static_pages#claudia_dashboard"


  get 'static_pages/pferdefutter'
  get 'stinah/wizard', to: 'static_pages#pferdefutter', as: "pferdefutter"


  get 'impressum', to: 'static_pages#impressum', as: "impressum"

  get 'iframer', to: 'static_pages#iframer', as: "iframer"
  get 'cockpit', to: 'static_pages#cockpit', as: "cockpit"
  get 'cockpit_start', to: 'static_pages#cockpit_start', as: "cockpit_start"
  get 'google_sheets', to: 'static_pages#google_sheets', as: "google_sheets"
  get 'swiss_vegan_awards_jury_query', to: 'static_pages#swiss_vegan_awards_jury_query', as: "swiss_vegan_awards_jury_query"


  #get 'sandro-raess', to: 'static_pages#about', as: "about"
  get 'sandro-raess', to: redirect("https://sandro-raess.ch/")
  get 'stinah/:id', to: 'donation_projects#show', as: "stinah"
  get 'visits', to: 'static_pages#visits', as: "visits"
  get 'sandro-raess/essays', to: 'static_pages#essays', as: "sandro_raess_essays"
  get 'sandro-raess/projects', to: 'static_pages#projects', as: "sandro_raess_projects"

  get 'chat/get_next_chat_message(/:id)', to: 'chat#get_next_chat_message', as: 'get_next_chat_message'
  get 'chat/get_next_chat_button(/:id)', to: 'chat#get_next_chat_button', as: 'get_next_chat_button'
  get 'chat_messages_controller/visual(/:id)', to: 'chat_messages#visual', as: "chat_messages_visual"

  resources :posts
  resources :user_roles
  resources :roles
  resources :pages
  #devise_for :users
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  resources :chat_messages do
    member do
      get 'json'
    end
  end

  if Rails.env.development?
    get 'test/generate_json_of_translation'
    get 'test/create_donations_json_only'
  end


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

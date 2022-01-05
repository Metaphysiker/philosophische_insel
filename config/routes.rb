Rails.application.routes.draw do

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

  get 'static_pages/pferdefutter'
  get 'stinah/wizard', to: 'static_pages#pferdefutter', as: "pferdefutter"


  get 'impressum', to: 'static_pages#impressum', as: "impressum"

  get 'iframer', to: 'static_pages#iframer', as: "iframer"
  get 'cockpit', to: 'static_pages#cockpit', as: "cockpit"

  get 'sandro-raess', to: 'static_pages#about', as: "about"
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
  devise_for :users
  resources :chat_messages

  if Rails.env.development?
    get 'test/generate_json_of_translation'
    get 'test/create_donations_json_only'
  end


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

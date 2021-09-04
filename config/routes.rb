Rails.application.routes.draw do

  resources :donation_projects
  resources :donations
  get 'chat', to: 'chat#chat', as: "chat"
  root 'static_pages#welcome'
  get 'static_pages/welcome'

  get 'sandro-raess', to: 'static_pages#about', as: "about"
  get 'stinah/:donation_project_slug', to: 'static_pages#stinah', as: "stinah"
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


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

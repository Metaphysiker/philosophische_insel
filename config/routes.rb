Rails.application.routes.draw do
  resources :chat_messages
  get 'chat/chat'
  root 'static_pages#welcome'
  get 'static_pages/welcome'

  get 'chat/select_option(/:id)', to: 'chat#select_option', as: 'chat_select_option'
  get '/debate_a_vegan(/:slide)', to: 'debate_a_vegan#debate', as: 'debate_a_vegan'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

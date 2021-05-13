Rails.application.routes.draw do
  resources :chat_messages
  get 'chat/chat'
  root 'static_pages#welcome'
  get 'static_pages/welcome'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

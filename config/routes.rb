Rails.application.routes.draw do
  resources :chat_messages
  get 'chat', to: 'chat#chat', as: "chat"
  root 'static_pages#welcome'
  get 'static_pages/welcome'

  get 'chat/select_option(/:id)', to: 'chat#select_option', as: 'chat_select_option'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  resources :chat_messages
  get 'chat', to: 'chat#chat', as: "chat"
  root 'static_pages#welcome'
  get 'static_pages/welcome'

  get 'chat/get_next_chat_message(/:id)', to: 'chat#get_next_chat_message', as: 'get_next_chat_message'
  get 'chat/get_next_chat_button(/:id)', to: 'chat#get_next_chat_button', as: 'get_next_chat_button'


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

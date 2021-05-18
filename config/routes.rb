Rails.application.routes.draw do
  root to: 'books#index'
  resources :authors
  resources :books
end

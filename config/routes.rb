Rails.application.routes.draw do
  root to: 'books#index'
  resources :authors
  resources :books
  resources :years
  get 'books/list/:id' => 'books_lists#show'
  get 'authors/:id/details' => 'author_details#show'
  put 'authors/:id/details' => 'author_details#update'
end

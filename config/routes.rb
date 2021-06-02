Rails.application.routes.draw do
  root to: 'home#index'

  scope constraints: lambda { |req| req.format == :json } do
    resources :authors, only: %i[index show] do
      post :details, to: 'author_details#create', on: :collection
      resource :details, controller: 'author_details', only: %i[show update]
    end

    resources :books, only: %i[index show] do
      post :details, to: 'book_details#create', on: :collection
      resource :details, controller: 'book_details', only: %i[show update]
    end

    resources :years, only: :index

    resources :tags, only: :index
  end

  get '*path', to: 'home#index', format: :html
end

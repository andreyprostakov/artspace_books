Rails.application.routes.draw do
  root to: 'home#index', format: :html

  defaults format: :json do
    resources :authors, only: %i[index show] do
      post :details, to: 'author_details#create', on: :collection
      resource :details, controller: 'author_details', only: %i[show update]
    end

    resources :books, only: %i[index show] do
      post :details, to: 'book_details#create', on: :collection
      resource :details, controller: 'book_details', only: %i[show update]
    end

    resources :years, only: :index
  end
end

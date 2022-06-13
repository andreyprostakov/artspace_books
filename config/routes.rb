Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do
    scope constraints: ->(req) { req.format == :json } do
      namespace :authors do
        resources :full_entries, only: %i[show create update destroy]
        resources :index_entries, only: %i[show index]
        resources :ref_entries, only: %i[show index]
      end

      resources :books, only: %i[index show] do
        post :details, to: 'book_details#create', on: :collection
        resource :details, controller: 'book_details', only: %i[show update]
        put :sync_goodreads_stats, on: :member
      end

      namespace :books_batch do
        post :assign_tags
      end

      resources :years, only: :index

      namespace :tags do
        resources :ref_entries, only: :index
      end
    end
  end

  get '*path', to: 'home#index', format: :html
end

Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do
    scope constraints: ->(req) { req.format == :json } do
      namespace :authors do
        resources :full_entries, only: %i[show create update destroy]
        resources :index_entries, only: %i[show index]
        resources :ref_entries, only: %i[show index]
        resource :search, only: :show, controller: 'search'
      end

      namespace :books do
        resource :batch, only: :update, controller: 'batch'
        resources :full_entries, only: %i[show create update destroy]
        resources :index_entries, only: %i[show index]
        resources :popularity, only: :update
        resources :ref_entries, only: %i[show index]
        resources :years, only: :index
        resource :search, only: :show, controller: 'search'
      end

      namespace :tags do
        resources :categories, only: :index
        resources :full_entries, only: %i[update destroy]
        resources :index_entries, only: %i[show index]
        resources :ref_entries, only: %i[show index]
        resource :search, only: :show, controller: 'search'
      end
    end
  end

  get '*path', to: 'home#index', format: :html
end

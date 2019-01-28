Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :assets, only: [:index, :show]
    resources :watched_assets, only: [:index, :create, :destroy]
    resources :portfolio_actions, only: [:index, :create]
  end

  root 'static_pages#root'
end

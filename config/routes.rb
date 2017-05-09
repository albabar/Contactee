Rails.application.routes.draw do
  scope :api, constraints: lambda { |req| req.format == :json } do
    devise_for :users, skip: %i(registrations sessions)
    as :user do
      post :users, to: 'devise/registrations#create'
      post 'users/sign_in' => 'devise/sessions#create'
      delete 'users/sign_in' => 'devise/sessions#destroy'
    end
  end

  namespace :api, constraints: lambda { |req| req.format == :json } do
    get :me, to: 'me#index'
    resources :groups, param: :slug
  end

  root 'home#index'
  get '*path' => 'home#index'
end

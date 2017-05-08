Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get '*path' => 'home#index'
end

Rails.application.routes.draw do
  root 'home#index'
  get '*path' => 'home#index'
end

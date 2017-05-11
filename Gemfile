# frozen_string_literal: true

source 'https://rubygems.org'
ruby '~> 2.4.0'

gem 'rails', '~> 5.1.0'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'turbolinks', '~> 5'
gem 'devise', github: 'plataformatec/devise'
gem 'friendly_id'
gem 'paranoia'

group :development, :test do
  gem 'byebug', platforms: %i(mri mingw x64_mingw)
  gem 'rubocop', require: false
end

group :test do
  gem 'rspec-rails', '~> 3.6', require: false
  gem 'factory_girl_rails', '~> 4.0', require: false
  gem 'shoulda-matchers',
      github: 'thoughtbot/shoulda-matchers', branch: 'rails-5', require: false
  gem 'simplecov', require: false
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

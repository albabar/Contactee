# frozen_string_literal: true

require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require 'simplecov'
SimpleCov.start 'rails'
require File.expand_path('../../config/environment', __FILE__)
abort('Running in production mode!') if Rails.env.production?
require 'rspec/rails'
require 'factory_girl_rails'
require 'shoulda/matchers'
ActiveRecord::Migration.maintain_test_schema!

require 'support/authenticated_endpoints'
require 'support/request_spec_helper'

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include RequestSpecHelper, type: :request

  config.use_transactional_fixtures = true

  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!
end

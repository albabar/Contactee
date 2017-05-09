# frozen_string_literal: true

class API::BaseController < ApplicationController
  before_action :authenticate_user!
end

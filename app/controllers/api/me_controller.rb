# frozen_string_literal: true

class API::MeController < ApplicationController
  def index
    if user_signed_in?
      render json: { signed_in: true, user: current_user }
    else
      render json: { signed_in: false }, status: 401
    end
  end
end

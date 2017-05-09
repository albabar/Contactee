# frozen_string_literal: true

module RequestSpecHelper
  attr_reader :user

  def sign_in(user = nil, password = nil)
    @user = user.presence || create_user
    post '/api/users/sign_in.json', params: login_attributes(password)
  end

  def sign_out
    delete '/api/users/sign_in.json'
  end

  private

  def create_user
    attributes = attributes_for(:user)
    @password = attributes[:password]
    User.create!(attributes)
  end

  def login_attributes(password = nil)
    { user: { email: @user.email, password: password || @password } }
  end
end

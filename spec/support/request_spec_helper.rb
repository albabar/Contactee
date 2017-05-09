module RequestSpecHelper
  attr_reader :user

  def sign_in(user = nil, password = nil)
    @user = user.presence || create_user
    login_attributes = {user: { email: @user.email, password: password || @password} }
    post '/api/users/sign_in.json', params: login_attributes
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
end

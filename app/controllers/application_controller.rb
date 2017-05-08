class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_users_name_for_reg, if: :devise_controller?

  private

  def configure_users_name_for_reg
    keys = %i(first_name last_name email password password_confirmation)
    devise_parameter_sanitizer.permit(:sign_up, keys: keys)
  end
end

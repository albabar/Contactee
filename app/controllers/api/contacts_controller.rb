# frozen_string_literal: true

class API::ContactsController < API::BaseController
  before_action :find_contact, only: %i(show update destroy)

  def index
    render json: current_user.contacts
  end

  def show
    render json: @contact
  end

  def create
    render json: current_user.contacts.create!(contact_params), status: :created
  end

  def update
    @contact.update! contact_params
    render json: @contact.reload
  end

  def destroy
    @contact.destroy
    head :no_content
  end

  private

  def contact_params
    params.require(:contact).
      permit(:first_name, :last_name, :email, :organization,
             :is_organization, :cellular,:phone, :birthday,
             :address_line1, :address_line2, :homepage, :notes
      ).merge(user: current_user, slug: nil)
  end

  def find_contact
    @contact ||= current_user.contacts.find_by!(slug: params[:slug])
  rescue ActiveRecord::RecordNotFound => _e
    render json: { error: 'contact not found!' }, status: :not_found
  end
end

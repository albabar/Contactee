# frozen_string_literal: true

class API::GroupsController < API::BaseController
  before_action :find_group, only: %i(show update destroy)

  def index
    render json: current_user.groups
  end

  def show
    render json: @group
  end

  def create
    group = current_user.groups.create(group_params)
    body, status = if group.id
                     [group, :created]
                   else
                     [{errors: group.errors}, :unprocessable_entity]
                   end

    render json: body, status: status
  end

  def update
    @group.update! name: params[:group][:name], slug: nil
    render json: @group.reload
  end

  def destroy
    @group.destroy
    head :no_content
  end

  private

  def group_params
    { name: params[:group][:name], user: current_user }
  end

  def find_group
    @group ||= current_user.groups.find_by!(slug: params[:slug])
  rescue ActiveRecord::RecordNotFound => _e
    render json: { error: 'Group not found!' }, status: :not_found
  end
end

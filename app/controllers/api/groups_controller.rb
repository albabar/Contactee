class API::GroupsController < API::BaseController
  before_action :find_group, only: %i(show update destroy)

  def index
    render json: current_user.groups
  end

  def show; end

  def create
    current_user.groups.create! group_params
  end

  def update
    @group.update! name: params[:group][:name], slug: nil
  end

  def destroy
    @group.destroy
  end

  private

  def group_params
    { name: params[:group][:name], user: current_user }
  end

  def find_group
    @group ||= current_user.groups.find_by!(slug: params[:slug])
  end
end

RSpec.describe 'Group Management', :type => :request do
  let(:group_attributes) { {group: {name: 'Best Buds'}} }
  let(:parsed_response) { JSON.parse(response.body) }
  let(:group) { Group.create! group_attributes[:group].merge(user: user) }

  before do
    sign_in
    group
  end

  describe 'GET /api/groups' do
    let(:api_call) { get '/api/groups.json' }

    it 'returns all groups' do
      api_call
      expect(parsed_response).to be_an(Array)
      expect(parsed_response.first['id']).to eq(group.id)
      expect(response).to have_http_status(:success)
    end

    it_behaves_like 'authenticated_endpoint'
  end

  describe 'GET /api/groups/:slug' do
    let(:api_call) { get "/api/groups/#{group.slug}.json" }

    it 'returns the group' do
      api_call
      expect(parsed_response).to be_an(Hash)
      expect(parsed_response['id']).to eq(group.id)
      expect(response).to have_http_status(:success)
    end

    it 'returns the group' do
      get "/api/groups/#{group.id}.json"
      expect(parsed_response).to be_an(Hash)
      expect(parsed_response['error']).to eq('Group not found!')
      expect(response).to have_http_status(404)
    end

    it_behaves_like 'authenticated_endpoint'
  end

  describe 'POST /api/groups' do
    let(:api_call) { post '/api/groups.json', params: group_attributes }

    it 'creates a group' do
      expect { api_call }.to change(Group, :count).by(1)
    end

    it 'returns newly created group' do
      api_call
      expect(parsed_response).to be_an(Hash)
      expect(parsed_response['id']).to be_an(Integer)
      expect(response).to have_http_status(201)
    end

    it_behaves_like 'authenticated_endpoint'
  end

  describe 'PATCH /api/groups/:slug' do
    let(:new_params) { {group: {name: 'Childhood buds'}} }
    let(:api_call) { patch "/api/groups/#{group.slug}.json", params: new_params }

    it 'returns updated group' do
      api_call
      expect(parsed_response).to be_an(Hash)
      expect(parsed_response['id']).to eq(group.id)
      expect(parsed_response['name']).to eq(group.reload.name)
      expect(parsed_response['name']).to eq(new_params[:group][:name])
      expect(response).to have_http_status(200)
    end

    it 'returns newly created group' do
      api_call
      expect(parsed_response['slug']).not_to eq(group.slug)
      expect(parsed_response['slug']).to eq(group.reload.slug)
    end

    it_behaves_like 'authenticated_endpoint'
  end

  describe 'DELETE /api/groups/:slug' do
    let(:api_call) { delete "/api/groups/#{group.slug}.json" }

    it 'deletes the group' do
      api_call
      expect(response).to have_http_status(204)
    end
  end
end

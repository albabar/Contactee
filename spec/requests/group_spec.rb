RSpec.describe 'Group Management', :type => :request do
  let(:group_attributes) { {group: {name: 'Best Buds'}} }
  let(:parsed_response) { JSON.parse(response.body) }

  before { sign_in }

  describe 'GET /api/groups' do
    after { expect(response.content_type).to eq('application/json') }
    let(:api_call) { get '/api/groups.json' }

    it 'returns all groups' do
      group = Group.create! group_attributes[:group].merge(user: user)
      api_call
      expect(parsed_response).to be_an(Array)
      expect(parsed_response.first['id']).to eq(group.id)
      expect(response).to have_http_status(:success)
    end

    it_behaves_like 'authenticated_endpoint'
  end
end

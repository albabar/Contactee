RSpec.describe 'User Authentication', :type => :request do

  let(:parsed_response) { JSON.parse(response.body) }

  describe 'GET /api/me' do
    after { expect(response.content_type).to eq('application/json') }
    let(:api_call) { get '/api/me.json' }

    it 'returns logged in user' do
      sign_in
      api_call
      expect(parsed_response['user']['id']).to eq(user.id)
      expect(parsed_response['signed_in']).to be true
      expect(response).to have_http_status(:success)
    end

    it 'returns false' do
      api_call
      expect(parsed_response['signed_in']).to be false
      expect(parsed_response['user']).to be nil
      expect(response).to have_http_status(401)
    end
  end

  describe 'DELETE /api/users/sign_in.json' do
    it 'logs out user' do
      sign_out
      expect(response).to have_http_status(204)
    end
  end
end

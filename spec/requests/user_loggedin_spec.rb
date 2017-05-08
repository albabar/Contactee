RSpec.describe 'User Authentication', :type => :request do
  let(:user_attributes) { attributes_for(:user) }
  let(:login_attributes) { {user: user_attributes.slice(:email, :password)} }

  let!(:user) { User.create!(user_attributes) }
  let(:parsed_response) { JSON.parse(response.body) }

  describe 'GET /api/me' do
    after { expect(response.content_type).to eq('application/json') }

    it 'returns logged in user' do
      post '/api/users/sign_in.json', params: login_attributes
      get '/api/me.json'
      expect(parsed_response['user']['id']).to eq(user.id)
      expect(parsed_response['signed_in']).to be true
      expect(response).to have_http_status(:success)
    end

    it 'returns false' do
      get '/api/me.json'
      expect(parsed_response['signed_in']).to be false
      expect(parsed_response['user']).to be nil
      expect(response).to have_http_status(401)
    end
  end

  describe 'DELETE /api/users/sign_in.json' do
    it 'logs out user' do
      delete '/api/users/sign_in.json'
      expect(response).to have_http_status(204)
    end
  end
end

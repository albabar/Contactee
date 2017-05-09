# frozen_string_literal: true

RSpec.describe 'User Authentication', type: :request do
  let(:user_attributes) { attributes_for(:user) }
  let(:login_attributes) { { user: user_attributes.slice(:email, :password) } }

  let!(:user) { User.create!(user_attributes) }
  let(:parsed_response) { JSON.parse(response.body) }

  describe 'POST /api/users/sign_in.json' do
    after { expect(response.content_type).to eq('application/json') }

    it 'logs in user with valid creds' do
      post '/api/users/sign_in.json', params: login_attributes
      expect(parsed_response['id']).to eq(user.id)
      expect(response).to have_http_status(:created)
    end

    it 'shows error with invalid creds' do
      post '/api/users/sign_in.json',
           params: { user: { email: 'mula@khao.com' } }
      expect(parsed_response['error']).to eq('Invalid Email or password.')
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

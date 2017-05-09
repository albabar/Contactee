# frozen_string_literal: true

RSpec.describe 'User Registration', type: :request do
  let(:user_attributes) { { user: attributes_for(:user) } }

  describe '/api/users.json' do
    it 'registers a new user' do
      expect do
        post '/api/users.json', params: user_attributes
      end.to change(User, :count).from(0).to(1)
    end
  end
end

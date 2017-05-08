RSpec.describe 'User Registration', :type => :request do
  let(:user_attributes) { {user: attributes_for(:user)} }

  describe '/api/users.json' do
    it 'registers a new user' do
      expect {
        post '/api/users.json', params: user_attributes
      }.to change(User, :count).from(0).to(1)
    end
  end
end

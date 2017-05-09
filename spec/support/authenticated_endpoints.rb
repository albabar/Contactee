RSpec.shared_examples_for 'authenticated_endpoint' do
  before { delete '/api/users/sign_in.json' }
  let(:parsed_response) { JSON.parse(response.body) }

  it 'shows error' do
    api_call
    expect(response).to have_http_status(401)
    expect(parsed_response['error']).to eq('You need to sign in or sign up before continuing.')
  end
end

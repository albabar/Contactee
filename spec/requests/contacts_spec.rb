# frozen_string_literal: true

RSpec.describe 'Contact API Endpoints', type: :request do
  let(:contact_attributes) { { contact: attributes_for(:contact) } }
  let(:parsed_response) { JSON.parse(response.body) }
  let(:contact) { create :contact, user: user }

  before do
    sign_in
    contact
  end

  describe 'GET /api/contacts' do
    let(:api_call) { get '/api/contacts' }

    it 'returns all contacts' do
      api_call
      expect(parsed_response).to be_an(Array)
      expect(parsed_response.first['id']).to eq(contact.id)
      expect(response).to have_http_status(:success)
    end

    it_behaves_like 'authenticated_endpoint'
  end

  describe 'GET /api/contacts/:slug' do
    let(:api_call) { get "/api/contacts/#{contact.slug}" }

    it 'returns the contact' do
      api_call
      expect(parsed_response).to be_an(Hash)
      expect(parsed_response['id']).to eq(contact.id)
      expect(response).to have_http_status(:success)
    end

    it 'returns the contact' do
      get "/api/contacts/#{contact.id}"
      expect(parsed_response).to be_an(Hash)
      expect(parsed_response['error']).to eq('contact not found!')
      expect(response).to have_http_status(404)
    end

    it_behaves_like 'authenticated_endpoint'
  end

  describe 'POST /api/contacts' do
    let(:api_call) { post '/api/contacts', params: contact_attributes }

    it 'creates a contact' do
      expect { api_call }.to change(Contact, :count).by(1)
    end

    it 'returns newly created contact' do
      api_call
      expect(parsed_response).to be_an(Hash)
      expect(parsed_response['id']).to be_an(Integer)
      expect(response).to have_http_status(201)
    end

    it 'only creates for current user' do
      old_user = user
      sign_out
      sign_in
      api_call
      expect(parsed_response['user_id']).not_to eq(old_user.id)
      expect(parsed_response['user_id']).to eq(user.id)
      expect(response).to have_http_status(201)
    end

    context 'invalid data' do
      let(:contact_attributes) { { contact: { first_name: 'Something' } } }

      it 'returns model errors in case of failure' do
        api_call
        expect(parsed_response).to be_an(Hash)
        expect(parsed_response['id']).to be_nil
        expect(parsed_response['errors']).to be_an(Hash)
        expect(response).to have_http_status(422)
      end
    end

    it_behaves_like 'authenticated_endpoint'
  end

  describe 'PATCH /api/contacts/:slug' do
    let(:new_params) { { contact: { organization: 'SpaceX' } } }
    let(:api_call) { patch "/api/contacts/#{contact.slug}", params: new_params }

    it 'returns updated contact' do
      api_call
      expect(parsed_response).to be_an(Hash)
      expect(parsed_response['id']).to eq(contact.id)
      expect(parsed_response['organization']).to eq(contact.reload.organization)
      expect(parsed_response['organization']).
        to eq(new_params[:contact][:organization])
      expect(response).to have_http_status(200)
    end

    context 'invalid data' do
      let!(:another_contact) { create(:contact, user: User.last) }
      let(:new_params) { { contact: { email: another_contact.email } } }

      it 'returns model errors in case of failure' do
        expect(contact.id).not_to eq(another_contact.id)
        api_call
        expect(parsed_response).to be_an(Hash)
        expect(parsed_response['errors']).to be_an(Hash)
        expect(response).to have_http_status(422)
      end
    end

    it_behaves_like 'authenticated_endpoint'
  end

  describe 'DELETE /api/contacts/:slug' do
    let(:api_call) { delete "/api/contacts/#{contact.slug}" }

    it 'deletes the contact' do
      api_call
      expect(response).to have_http_status(204)
    end
  end
end

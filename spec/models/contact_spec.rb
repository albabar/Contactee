# frozen_string_literal: true

RSpec.describe Contact, type: :model do
  it { is_expected.to validate_presence_of(:first_name) }
  it { is_expected.to validate_presence_of(:last_name) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:user) }
  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_and_belong_to_many(:groups) }

  let(:user) { create(:user) }
  let(:contact_attributes) do
    {
      user: user, first_name: 'Elon', last_name: 'Musk',
      email: 'elon@example.com', slug: 'something'
    }
  end
  let(:contact) { described_class.create!(contact_attributes) }
  let(:parsed_json) { JSON.parse(contact.to_json) }

  context 'uniqueness' do
    subject { described_class.new(contact_attributes) }
    it do
      is_expected.
        to validate_uniqueness_of(:email).scoped_to(:user_id).case_insensitive
    end
  end

  context 'API' do
    let(:expect_attributes) do
      %w(
        id first_name last_name user_id email organization notes
        is_organization cellular phone birthday address_line1 slug
        address_line2 homepage groups group_ids created_at updated_at
      )
    end

    it 'serialize in JSON with all required attributes' do
      expect(parsed_json.keys).to match_array(expect_attributes)
    end
  end
end

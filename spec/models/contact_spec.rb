# frozen_string_literal: true

RSpec.describe Contact, type: :model do
  it { is_expected.to validate_presence_of(:first_name) }
  it { is_expected.to validate_presence_of(:last_name) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:user) }
  it { is_expected.to belong_to(:user) }

  context 'uniqueness' do
    let(:user) { create(:user) }
    subject do
      described_class.new(
        user: user, first_name: 'Elon', last_name: 'Musk',
        email: 'elon@example.com', slug: 'something'
      )
    end
    it do
      is_expected.
        to validate_uniqueness_of(:email).scoped_to(:user_id).case_insensitive
    end
  end
end

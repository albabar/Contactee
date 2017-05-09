# frozen_string_literal: true

RSpec.describe User, type: :model do
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_confirmation_of(:password) }
  it { is_expected.to have_many(:groups) }
  it { is_expected.to have_many(:contacts) }

  context 'uniqueness' do
    subject do
      described_class.new(
        email: 'entry@example.org', encrypted_password: 'Hello123'
      )
    end
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  end
end

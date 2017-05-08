RSpec.describe User, type: :model do
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_confirmation_of(:password) }
  it { is_expected.to have_many(:groups) }

  context 'uniqueness' do
    subject { described_class.new(email: 'entry@example.org', encrypted_password: 'Hello123') }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  end
end

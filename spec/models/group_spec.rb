# frozen_string_literal: true

RSpec.describe Group, type: :model do
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:user) }
  it { is_expected.to belong_to(:user) }
end

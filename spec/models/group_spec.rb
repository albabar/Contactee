# frozen_string_literal: true

RSpec.describe Group, type: :model do
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:user) }
  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_and_belong_to_many(:contacts) }

  let(:user) { create(:user) }
  let(:group) { described_class.create!(name: 'Buds', user: user) }
  let(:parsed_json) { JSON.parse(group.to_json) }

  context 'API' do
    let(:expect_attributes) do
      %w{id name user_id slug contacts created_at updated_at}
    end

    it 'serialize in JSON with all required attributes' do
      expect(parsed_json.keys).to match_array(expect_attributes)
    end
  end
end

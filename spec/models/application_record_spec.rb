# frozen_string_literal: true

RSpec.describe ApplicationRecord, type: :model do
  it 'is a abstract class' do
    expect(described_class.abstract_class).to be true
  end
end

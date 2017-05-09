class Group < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: %i(slugged scoped), scope: :user_id

  belongs_to :user

  validates_presence_of :user, :name
end

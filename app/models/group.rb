class Group < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user

  validates_presence_of :user, :name
end

# frozen_string_literal: true

class Group < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: %i(slugged scoped), scope: :user_id

  belongs_to :user

  validates :user, :name, presence: true
end

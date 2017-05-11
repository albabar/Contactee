# frozen_string_literal: true

class Group < ApplicationRecord
  acts_as_paranoid
  extend FriendlyId
  friendly_id :name, use: %i(slugged scoped), scope: :user_id

  belongs_to :user
  has_and_belongs_to_many :contacts

  validates :user, :name, presence: true

  def as_json(options = {})
    super(options.merge(include: :contacts, except: :deleted_at))
  end
end

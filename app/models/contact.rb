# frozen_string_literal: true

class Contact < ApplicationRecord
  acts_as_paranoid
  extend FriendlyId
  friendly_id :slug_candidates, use: %i(slugged scoped), scope: :user_id

  belongs_to :user
  has_and_belongs_to_many :groups

  validates :user, :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: { scope: :user_id }

  def email=(email)
    super(email&.downcase)
  end

  def as_json(options = {})
    super(options.merge(
      include: :groups, methods: :group_ids, except: :deleted_at
    ))
  end

  private

  def slug_candidates
    [
      :first_name,
      %i(first_name last_name),
      %i(first_name last_name organization),
      %i(first_name last_name organization email)
    ]
  end
end

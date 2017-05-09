# frozen_string_literal: true

class Contact < ApplicationRecord
  extend FriendlyId
  friendly_id :slug_candidates, use: %i(slugged scoped), scope: :user_id

  belongs_to :user

  validates :user, :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: { scope: :user_id }

  def email=(email)
    super(email&.downcase)
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

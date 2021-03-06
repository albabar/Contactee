# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable,
  # :recoverable, :trackable
  devise :database_authenticatable, :registerable, :rememberable, :validatable

  has_many :groups
  has_many :contacts
end

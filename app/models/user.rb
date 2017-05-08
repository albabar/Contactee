class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable,
  # :recoverable, :trackable
  devise :database_authenticatable, :registerable, :rememberable, :validatable

  has_many :groups
end

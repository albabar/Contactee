# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    first_name 'Nikola'
    last_name 'Tesla'
    email { generate(:email) }
    password 'MulaKhao'
    password_confirmation 'MulaKhao'
  end

  sequence :email do |n|
    "person#{n}@example.com"
  end
end

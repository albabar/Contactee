# frozen_string_literal: true

FactoryGirl.define do
  factory :contact do
    first_name 'Elon'
    last_name 'Musk'
    email { generate(:contact_email) }
    organization 'Tesla'
  end

  sequence :contact_email do |n|
    "contact#{n}@example.com"
  end
end

FactoryGirl.define do
  factory :user do
    first_name 'Hello'
    last_name 'Mula'
    email { generate(:email) }
    password 'MulaKhao'
    password_confirmation 'MulaKhao'
  end

  sequence :email do |n|
    "person#{n}@example.com"
  end
end

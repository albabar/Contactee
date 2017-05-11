# frozen_string_literal: true

puts 'Seeding Users'
User.create! first_name: 'Babar', last_name: 'Al-Amin', email: 'knock@babar.im', password: 'asdasd123', password_confirmation: 'asdasd123'
User.create! first_name: 'Another', last_name: 'User', email: 'user@example.com', password: 'asdasd123', password_confirmation: 'asdasd123'

puts 'Seeding groups'
Group.create! name: 'Friends', user: User.first
Group.create! name: 'Family', user: User.first
Group.create! name: 'Work', user: User.first
Group.create! name: 'FnF', user: User.second
Group.create! name: 'Team Mates', user: User.second
Group.create! name: 'Family', user: User.second

puts 'Seeding Contacts'
Contact.create! first_name: 'Elon', last_name: 'Musk', email: 'em@example.com', user: User.first, group_ids: User.first.group_ids.sample(rand(0..3))
Contact.create! first_name: 'Linus', last_name: 'Torvalds', email: 'lt@example.com', user: User.first, group_ids: User.first.group_ids.sample(rand(0..3))
Contact.create! first_name: 'David', last_name: 'Heinemeier Hansson', email: 'dhh@example.com', user: User.first, group_ids: User.first.group_ids.sample(rand(0..3))
Contact.create! first_name: 'Jason', last_name: 'Fried', email: 'jf@example.com', user: User.first, group_ids: User.first.group_ids.sample(rand(0..3)), organization: 'Basecamp', is_organization: true
Contact.create! first_name: 'Elon', last_name: 'Musk', email: 'em@example.com', user: User.second, group_ids: User.first.group_ids.sample(rand(0..3))

puts '=' * 20
puts "You can now login with email: #{User.pluck(:email).join(' / ')} and password: asdasd123"
puts '=' * 20

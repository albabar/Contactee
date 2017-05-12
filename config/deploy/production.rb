# frozen_string_literal: true

set :user, 'babar'
set :deploy_to, (-> { "/home/#{fetch(:user)}/Sites/#{fetch(:application)}" })
set :host, 'contactee.ibabar.com'
server 'Ruby', user: fetch(:user), roles: %w{app db web}
set :rbenv_ruby, '2.4.1'

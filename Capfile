# frozen_string_literal: true

require 'capistrano/setup'
require 'capistrano/deploy'
require 'capistrano/rbenv'
require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git
require 'capistrano/rails'
require 'capistrano/yarn'
require 'capistrano/erb-uploader'
require 'capistrano/puma'
install_plugin Capistrano::Puma

Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }

# frozen_string_literal: true

lock '3.8.1'

set :application, 'Contactee'
set :repo_url, 'git@github.com:albabar/Contactee.git'

set :linked_files, fetch(:linked_files, []).push(
  'config/database.yml', 'config/secrets.yml'
)
set :linked_dirs, fetch(:linked_dirs, []).push(
  'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle',
  'public/system', 'public/uploads', 'node_modules'
)

set :log_level, :info
set :format, :pretty

set :erb_files, fetch(:erb_files, []).push('config/nginx.conf.erb')

Rake::Task['deploy:assets:precompile'].clear_actions

namespace :deploy do
  namespace :assets do
    desc 'Precompile assets locally and then copy to web servers'
    task :precompile do
      run_locally do
        execute 'RAILS_ENV=production bundle exec rails assets:precompile'
        execute 'tar -zcvf assets.tar.tgz public/assets/'
        execute 'tar -zcvf packs.tar.tgz public/packs/'
        execute "scp assets.tar.tgz packs.tar.tgz Ruby:#{release_path}/"
        execute 'rm -rf public/assets public/packs assets.tar.tgz packs.tar.tgz'
      end
      on roles(:all) do |_host|
        execute "cd #{release_path}; tar zxvf assets.tar.tgz"
        execute "cd #{release_path}; tar zxvf packs.tar.tgz"
        execute "cd #{release_path}; rm -f assets.tar.tgz packs.tar.tgz"
      end
      invoke 'deploy:restart'
    end
  end
end

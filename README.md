# Contactee

Contact management application for mere mortals.

### Features

* User Registration
* Login
* Manage contacts
* Group contacts
* Soft delete contacts
* Separate API and frontend
* SPA frontend with ReactJS

### Technologies Used

* Ruby 2.4
* Rails 5.1
* NodeJS 7
* ReactJS
* React Router
* PostgreSQL
* Capistrano

### How to run Locally
* Clone the app
* Run `bundle install`
* Copy the `config/database.example.yml` to `config/database.yml` and fill out your details.
* Create DB and migrate: `rails db:create db:schema:load`
* Load up data: `rails db:seed`
* Boot up server `rails s`
* Run `./bin/webpack-dev-server` on a separate terminal session.
* Hit `http://localhost:3000` and start managing your contacts.


### Deploy in Production
* Adjust values in `config/deploy/production.rb`
* Run `cap production deploy:check`, it'll report if things are not in order. Fix them.
* Deploy with Capistrano: `cap production deploy`
* Log into server and link/copy `current/config/nginx.conf` into your NginX config.
* Load up data: `rails db:seed`
* Restart Nginx and Visit your URL
* You should see the homepage.

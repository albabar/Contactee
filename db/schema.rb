# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170511145236) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contacts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "organization"
    t.boolean "is_organization", default: false
    t.string "cellular"
    t.string "phone"
    t.date "birthday"
    t.string "address_line1"
    t.string "address_line2"
    t.string "homepage"
    t.text "notes"
    t.string "slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "user_id"], name: "index_contacts_on_email_and_user_id", unique: true
    t.index ["slug", "user_id"], name: "index_contacts_on_slug_and_user_id", unique: true
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "contacts_groups", id: false, force: :cascade do |t|
    t.bigint "contact_id", null: false
    t.bigint "group_id", null: false
    t.index ["contact_id", "group_id"], name: "index_contacts_groups_on_contact_id_and_group_id"
    t.index ["group_id", "contact_id"], name: "index_contacts_groups_on_group_id_and_contact_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug", "user_id"], name: "index_groups_on_slug_and_user_id", unique: true
    t.index ["user_id"], name: "index_groups_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "contacts", "users"
  add_foreign_key "groups", "users"
end

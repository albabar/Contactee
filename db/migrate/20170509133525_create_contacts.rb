class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :organization
      t.boolean :is_organization, default: false
      t.string :cellular
      t.string :phone
      t.date :birthday
      t.string :address_line1
      t.string :address_line2
      t.string :homepage
      t.text :notes
      t.string :slug, null: false

      t.timestamps
      t.datetime :deleted_at, index: true

      t.index %i(email user_id), unique: true
      t.index %i(slug user_id), unique: true
    end
  end
end

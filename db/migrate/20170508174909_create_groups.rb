class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.string :slug, unique: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
      t.datetime :deleted_at, index: true

      t.index %i(slug user_id), unique: true
    end
  end
end

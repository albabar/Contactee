class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.string :slug, unique: true
      t.references :user, null: false

      t.timestamps
    end
  end
end

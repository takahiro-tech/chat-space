class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :groupname, null: false
      t.index :groupname, unique: true
      t.timestamps
    end
  end
end

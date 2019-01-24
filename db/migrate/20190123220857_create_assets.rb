class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets do |t|
      t.string :name, null: false
      t.string :ticker, null: false
      t.string :description
    end

    add_index :assets, :name
    add_index :assets, :ticker, unique: true
  end
end

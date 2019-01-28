class CreateWatchedAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :watched_assets do |t|
      t.integer :user_id, null: false
      t.integer :asset_id, null: false

      t.timestamps
    end
  end
end

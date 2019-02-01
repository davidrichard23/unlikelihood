class UpdateWatchedAssets < ActiveRecord::Migration[5.2]
  def change
    remove_column :watched_assets, :asset_id
    add_column :watched_assets, :asset_symbol, :string
  end
end

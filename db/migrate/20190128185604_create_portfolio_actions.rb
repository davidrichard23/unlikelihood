class CreatePortfolioActions < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_actions do |t|
      t.integer :asset_id, null: false
      t.integer :user_id, null: false
      t.float :shares, null: false
      t.string :action, null: false
      t.float :price, null: false

      t.timestamps
    end
  end
end

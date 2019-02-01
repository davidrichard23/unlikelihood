class UpdatePortfolioAction < ActiveRecord::Migration[5.2]
  def change
    remove_column :portfolio_actions, :asset_id
    add_column :portfolio_actions, :asset_symbol, :string
  end
end

class PortfolioAction < ApplicationRecord
  validates :shares, :price, :asset_symbol, presence: true
  validates :action, :inclusion=> { in: ['buy', 'sell'] }

  belongs_to :user
end
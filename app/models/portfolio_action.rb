class PortfolioAction < ApplicationRecord
  validates :shares, :price, presence: true
  validates :action, :inclusion=> { in: ['buy', 'sell'] }

  belongs_to :asset
  belongs_to :user
end
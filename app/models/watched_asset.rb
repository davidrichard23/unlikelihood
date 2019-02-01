class WatchedAsset < ApplicationRecord
  validates :asset_symbol, presence: true
  belongs_to :user
end
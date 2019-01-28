class WatchedAsset < ApplicationRecord
  belongs_to :user
  # belongs_to :asset,
  # foreign_key: :asset_id,
  # class_name: :Asset
end
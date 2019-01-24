class Asset < ApplicationRecord
  validates :name, presence: true
  validates :ticker, presence: true, uniqueness: true

  # has_many :asset_actions
end
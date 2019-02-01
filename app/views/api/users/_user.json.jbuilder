json.extract! user, :id, :email, :balance
json.firstName user.first_name
json.lastName user.last_name
json.watchedAssetSymbols user.watched_assets.map { |watched_asset| watched_asset.asset_symbol }
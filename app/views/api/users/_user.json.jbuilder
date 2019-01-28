json.extract! user, :id, :email, :balance
json.firstName user.first_name
json.lastName user.last_name
json.watchedAssetIds user.watched_asset_ids
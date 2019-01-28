@watched_assets.each do |watched_asset|
  json.extract! watched_asset, user_id, asset_id
end
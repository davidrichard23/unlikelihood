@assets.each do |asset|
  json.set! asset.id do
    json.partial! 'asset', asset: asset
  end
end


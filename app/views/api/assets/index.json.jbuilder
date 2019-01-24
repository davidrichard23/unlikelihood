@assets.each do |asset|
  json.set! asset.id do
    json.extract! asset, :id, :name, :ticker, :description
  end
end


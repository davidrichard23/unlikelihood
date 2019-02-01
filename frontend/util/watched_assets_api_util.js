export const fetchWatchedAssets = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/watched_assets'
  });
};

export const addAssetToWatchlist = symbol => {
  return $.ajax({
    method: 'POST',
    url: '/api/watched_assets',
    data: {asset: {asset_symbol: symbol}}
  });
};

export const removeAssetFromWatchlist = symbol => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/watched_assets/' + symbol
  });
};
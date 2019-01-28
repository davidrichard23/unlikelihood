export const fetchWatchedAssets = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/watched_assets'
  });
};

export const addAssetToWatchlist = id => {
  return $.ajax({
    method: 'POST',
    url: '/api/watched_assets',
    data: {asset: {asset_id: id}}
  });
};

export const removeAssetFromWatchlist = id => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/watched_assets/' + id
  });
};
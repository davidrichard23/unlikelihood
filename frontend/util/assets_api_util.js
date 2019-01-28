export const fetchAssets = query => {
  return $.ajax({
    method: 'GET',
    url: '/api/assets',
    data: {query: query}
  });
};

export const fetchAsset = (id) => {
  return $.ajax({
    method: 'GET',
    url: '/api/assets/' + id
  });
};
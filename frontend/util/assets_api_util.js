export const fetchAssets = searchText => {
  return $.ajax({
    method: 'GET',
    url: '/api/assets',
    data: {text: searchText}
  });
};

export const fetchAsset = (id) => {
  return $.ajax({
    method: 'GET',
    url: '/api/assets/' + id
  });
};
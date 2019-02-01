const baseUrl = 'https://api.iextrading.com/1.0';

export const fetchAllAssets = () => {
  return $.ajax({
    method: 'GET',
    url: baseUrl + `/ref-data/symbols`,
  });
};

export const fetchAssetInfo = symbol => {
  return $.ajax({
    method: 'GET',
    url: baseUrl + `/stock/${symbol}/company`,
  });
};

export const fetchChartData = (symbol, range) => {
  const data = {};
  if (range === '1D') data.chartInterval = 5;
  if (range === '5Y') data.chartInterval = 5;

  return $.ajax({
    method: 'GET',
    url: baseUrl + `/stock/${symbol}/chart/${range}`,
    data
  });
};

export const fetchMultipleChartData = (symbols, range) => {
  const data = {};
  if (range === '1D') data.chartInterval = 5;
  if (range === '5Y') data.chartInterval = 5;

  return $.ajax({
    method: 'GET',
    url: baseUrl + `/stock/market/batch?types=chart&symbols=${symbols}&range=${range}`,
    data
  });
};
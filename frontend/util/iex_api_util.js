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

export const fetchStockNews = (name) => {
  return $.ajax({
    method: 'GET',
    url: `https://newsapi.org/v2/everything?apiKey=15871334f1654361af31fbeb9403dd74&q=${name}&language=en`,
  });
};

export const fetchAllNews = () => {
  return $.ajax({
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?apiKey=15871334f1654361af31fbeb9403dd74&category=business&country=us`,
  });
};
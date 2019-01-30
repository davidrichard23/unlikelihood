const baseUrl = 'https://api.iextrading.com/1.0';
// const baseUrl = 'https://www.alphavantage.co';

export const fetchChartData = (ticker, range) => {
  const data = {};
  if (range === '1D') data.chartInterval = 5;
  if (range === '5Y') data.chartInterval = 5;

  return $.ajax({
    method: 'GET',
    url: baseUrl + `/stock/${ticker}/chart/${range}`,
    data
    // url: baseUrl + `/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=QOKJY6SXNZOUY0X8`,
  });
};

export const fetchMultipleChartData = (tickers, range) => {
  const data = {};
  if (range === '1D') data.chartInterval = 5;
  if (range === '5Y') data.chartInterval = 5;

  return $.ajax({
    method: 'GET',
    url: baseUrl + `/stock/market/batch?types=chart&symbols=${tickers}&range=${range}`,
    data
  });
};
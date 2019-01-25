const baseUrl = 'https://api.iextrading.com/1.0';
// const baseUrl = 'https://www.alphavantage.co';

export const fetchChartData = (ticker) => {
  return $.ajax({
    method: 'GET',
    url: baseUrl + `/stock/${ticker}/chart/1d`,
    data: { chartInterval: 5 }
    // url: baseUrl + `/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=QOKJY6SXNZOUY0X8`,
  });
};
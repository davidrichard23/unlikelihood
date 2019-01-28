import * as IexApiUtil from '../util/iex_api_util';

export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';
export const RECEIVE_MULTIPLE_CHART_DATA = 'RECEIVE_MULTIPLE_CHART_DATA';


const receiveChartData = (chartData, ticker) => ({
  type: RECEIVE_CHART_DATA,
  chartData,
  ticker
});

const receiveMultipleChartData = chartData => ({
  type: RECEIVE_MULTIPLE_CHART_DATA,
  chartData
});


export const fetchChartData = (ticker, range) => dispatch => {
  return IexApiUtil.fetchChartData(ticker, range)
  .then(data => {
    return dispatch(receiveChartData(formatData(data), ticker));
  });
};


export const fetchMultipleChartData = (tickers, range) => dispatch => {
  return IexApiUtil.fetchMultipleChartData(tickers, range)
  .then(data => {
    const chartData = {};
    Object.keys(data).forEach(key => {
      chartData[key] = formatData(data[key].chart);
    });
    return dispatch(receiveMultipleChartData(chartData));
  });
};




const formatData = data => {
  const chartData = {
    high: -Infinity,
    low: Infinity,
    open: data[0].close,
    close: data[data.length - 1].close,
    data: {},
  };

  data.forEach(d => {
    if (d.close && d.close !== -1) {
      chartData.data[d.label] = d.close;
      if (d.high > chartData.high) chartData.high = d.high;
      if (d.low < chartData.low) chartData.low = d.low;
    }
  });

  return chartData;
};
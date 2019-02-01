import * as IexApiUtil from '../util/iex_api_util';

export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';
export const RECEIVE_MULTIPLE_CHART_DATA = 'RECEIVE_MULTIPLE_CHART_DATA';


const receiveChartData = (chartData, symbol, range) => ({
  type: RECEIVE_CHART_DATA,
  chartData,
  symbol,
  range
});

const receiveMultipleChartData = (chartData, range) => ({
  type: RECEIVE_MULTIPLE_CHART_DATA,
  chartData,
  range
});


export const fetchChartData = (symbol, range) => dispatch => {
  return IexApiUtil.fetchChartData(symbol, range)
  .then(data => {
    return dispatch(receiveChartData(formatData(data), symbol, range));
  });
};


export const fetchMultipleChartData = (symbols, range) => dispatch => {
  return IexApiUtil.fetchMultipleChartData(symbols, range)
  .then(data => {
    const chartData = {};
    Object.keys(data).forEach(key => {
      chartData[key] = {[range]: formatData(data[key].chart)};
    });
    return dispatch(receiveMultipleChartData(chartData, range));
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
    // some dates are separated by dashes and some are not separated
    const date = d.date.split('-').join('');
    const minute = d.minute || '16:00:00';
    let dateStr = date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6) + ' ' + minute;

    if (d.close && d.close !== -1) {
      chartData.data[dateStr] = d.close;
      if (d.close > chartData.high) chartData.high = d.close;
      if (d.close < chartData.low) chartData.low = d.close;
    }
  });

  return chartData;
};
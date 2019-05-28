import * as IexApiUtil from '../util/iex_api_util';

export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';
export const RECEIVE_MULTIPLE_CHART_DATA = 'RECEIVE_MULTIPLE_CHART_DATA';


const receiveChartData = (chartData, symbol, range) => {
  return {
    type: RECEIVE_CHART_DATA,
    chartData: {...chartData, close: chartData.close},
    symbol,
    range
  }
};

const receiveMultipleChartData = (chartData, range) => ({
  type: RECEIVE_MULTIPLE_CHART_DATA,
  chartData,
  range
});


export const fetchChartData = (symbol, range) => dispatch => {
  return IexApiUtil.fetchChartData(symbol, range)
  .then(data => {
    const formattedData = formatData(data);
    // console.log(formattedData)
    return dispatch(receiveChartData(formattedData, symbol, range));
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
    open: findFirstValidTimepoint(data).close,
    close: null,
    data: {},
  };

  data.forEach((d, i) => {
    // some dates are separated by dashes and some are not separated
    const date = d.date.split('-').join('');
    const minute = d.minute || '16:00:00';
    let dateStr = date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6) + ' ' + minute;

    // if api doesn't return closing data for this timepoint, use the previous timepoint
    if (!d.close || d.close === -1) {
      // if there is no data for the first timepoint
      if (i === 0) d.close = findFirstValidTimepoint(data).close;
      else d.close = data[i - 1].close;
    }
    
    chartData.data[dateStr] = d.close;
    if (d.close > chartData.high) chartData.high = d.close;
    if (d.close < chartData.low) chartData.low = d.close;
    
    if (i === data.length - 1) {
      chartData.close = d.close;
      // console.log(d.close, chartData)
    }
  });
  // console.log(chartData)
  
  return chartData;
};


const findFirstValidTimepoint = (data) => {
  if (data.length === 0) return {close: null};
  
  let timepoint = {};
  let i = 1;
  
  while (!timepoint.close) {
    if (data[i].close && data[i].close !== -1) timepoint = data[i];
    i++;
  }

  return timepoint;
};
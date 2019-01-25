import * as IexApiUtil from '../util/iex_api_util';

export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';


const receiveChartData = chartData => ({
  type: RECEIVE_CHART_DATA,
  chartData
});


export const fetchChartData = (ticker, range) => dispatch => {
  return IexApiUtil.fetchChartData(ticker, range)
  .then(data => {
    return dispatch(receiveChartData(data));
    // return dispatch(receiveChartData(data['Time Series (5min)']));
  });
};
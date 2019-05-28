import { merge } from 'lodash';
import { RECEIVE_CHART_DATA, RECEIVE_MULTIPLE_CHART_DATA } from '../actions/chart_data_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHART_DATA: {
      let newState = merge({}, state);
      if (!newState[action.symbol]) newState[action.symbol] = {};
      newState[action.symbol][action.range] = action.chartData;
      if (action.range !== '1D') newState = getLatestPrice(newState, action.symbol, action.range);
      return newState;
    }
    case RECEIVE_MULTIPLE_CHART_DATA: {
      let newState = merge({}, state, action.chartData);

      if (action.range !== '1D') {
        const symbols = Object.keys(action.chartData);
        symbols.forEach(symbol => {
          newState = getLatestPrice(newState, symbol, action.range);
        });
      }
      return newState;
    }
    default:
      return state;
  }
};


const getLatestPrice = (newState, symbol, range) => {
  const oneDay = newState[symbol]['1D'].close ? newState[symbol]['1D'] : newState[symbol][range];
  const dates = Object.keys(oneDay.data);
  const latestDate = dates[dates.length - 1];
  const latestData = oneDay.data[latestDate];
  
  newState[symbol][range].data[latestDate] = latestData;
  newState[symbol][range].close = oneDay.close;

  return newState;
}
import { merge } from 'lodash';
import { RECEIVE_CHART_DATA, RECEIVE_MULTIPLE_CHART_DATA } from '../actions/chart_data_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHART_DATA: {
      const newState = merge({}, state);
      if (!newState[action.ticker]) newState[action.ticker] = {};
      newState[action.ticker][action.range] = action.chartData;
      return newState;
    }
    case RECEIVE_MULTIPLE_CHART_DATA: {
      const newState = merge({}, state, action.chartData);
      return newState;
    }
    default:
      return state;
  }
};
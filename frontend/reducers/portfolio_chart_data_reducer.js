import { merge } from 'lodash';
import { RECEIVE_PORTFOLIO_CHART_DATA } from '../actions/portfolio_chart_data_actions';

export default (state = {
  ['1D']: {
    high: 10,
    low: 0,
    close: 0,
    data: {},
  },
  ['1M']: {
    high: 10,
    low: 0,
    close: 0,
    data: {},
  },
  ['3M']: {
    high: 10,
    low: 0,
    close: 0,
    data: {},
  },
  ['1Y']: {
    high: 10,
    low: 0,
    close: 0,
    data: {},
  },
  ['5Y']: {
    high: 10,
    low: 0,
    close: 0,
    data: {},
  }
}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PORTFOLIO_CHART_DATA: {
      return action.chartData;
    }
    default:
      return state;
  }
};
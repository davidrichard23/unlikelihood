import { merge } from 'lodash';
import { RECEIVE_CHART_DATA } from '../actions/chart_data_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHART_DATA:
      return action.chartData;

    default:
      return state;
  }
};
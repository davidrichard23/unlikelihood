import { merge } from 'lodash';
import { RECEIVE_PORTFOLIO_CHART_DATA } from '../actions/portfolio_chart_data_actions';


export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PORTFOLIO_CHART_DATA: {
      return action.chartData;
    }
    default:
      return state;
  }
};
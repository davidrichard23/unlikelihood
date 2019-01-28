import { merge } from 'lodash';
import { RECEIVE_PORTFOLIO_ACTIONS } from '../actions/portfolio_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PORTFOLIO_ACTIONS: {
      return action.portfolioActions;
    }
    default:
      return state;
  }
};
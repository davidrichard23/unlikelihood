import { merge } from 'lodash';
import { RECEIVE_PORTFOLIO_ACTIONS, RECEIVE_PORTFOLIO_ACTION } from '../actions/portfolio_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PORTFOLIO_ACTIONS: {
      return action.portfolioActions;
    }
    case RECEIVE_PORTFOLIO_ACTION: {
      const newState = merge({}, state);
      if (!newState[action.portfolioAction.asset_id]) newState[action.portfolioAction.asset_id] = [];
      newState[action.portfolioAction.asset_id].push(action.portfolioAction);
      return newState;
    }
    default:
      return state;
  }
};
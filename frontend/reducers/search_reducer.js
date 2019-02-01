import { merge } from 'lodash';
import { RECEIVE_SEARCH_ASSETS } from '../actions/search_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SEARCH_ASSETS:
      return action.assetSymbols;

    default:
      return state;
  }
};
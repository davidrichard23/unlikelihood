import { merge } from 'lodash';
import { RECEIVE_STOCK_NEWS, RECEIVE_ALL_NEWS } from '../actions/news_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_STOCK_NEWS: {
      const newState = merge({}, state, {[action.name]: action.news});
      return newState;
    }
    case RECEIVE_ALL_NEWS: {
      const newState = merge({}, state);
      newState.all = action.news;
      return newState;
    }
    default:
      return state;
  }
};
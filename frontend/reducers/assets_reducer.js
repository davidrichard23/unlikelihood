import { merge } from 'lodash';
import { RECEIVE_ASSETS, RECEIVE_ASSET } from '../actions/assets_actions';

export default (state={}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ASSETS:
      return action.assets;
    case RECEIVE_ASSET: {
      const newState = merge({}, state);
      newState[action.asset.id] = action.asset;
      return newState;
    }
  
    default:
      return state;
  }
};
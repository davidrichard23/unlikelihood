import { merge } from 'lodash';
import { RECEIVE_ALL_ASSETS, RECEIVE_ASSET_INFO, RECEIVE_ASSET } from '../actions/assets_actions';

export default (state={}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_ASSETS: {
      const newState = merge({}, state, action.assets);
      return newState;
    }
    case RECEIVE_ASSET_INFO: {
      const newState = merge({}, state, { [action.assetInfo.symbol]: action.assetInfo});
      return newState;
    }
  
    default:
      return state;
  }
};
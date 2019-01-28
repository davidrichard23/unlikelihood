import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, RECEIVE_WATCHED_ASSET, REMOVE_WATCHED_ASSET } from '../actions/user_actions';

export default (state={}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:{
      return action.user;
    }
    case LOGOUT_CURRENT_USER:{
      return {};
    }
    case RECEIVE_WATCHED_ASSET:{
      const newState = merge({}, state);
      newState.watchedAssetIds.push(action.assetId);
      return newState;
    }
    case REMOVE_WATCHED_ASSET:{
      const newState = merge({}, state);
      newState.watchedAssetIds = newState.watchedAssetIds.filter(id => id !== action.assetId);
      return newState;
    }
    
    default:
      return state;
  }
}
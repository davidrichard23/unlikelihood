import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') { 
  middleware = [...middleware, logger]; 
}

export default (preloadedState = {}) => {
  return createStore(RootReducer, preloadedState, applyMiddleware(...middleware));
};
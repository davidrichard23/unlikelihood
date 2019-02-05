import * as SessionApiUtil from '../util/session_api_util';
import * as WatchedAssetsApiUtil from '../util/watched_assets_api_util';
import { fetchPortfolioActions } from '../actions/portfolio_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

export const RECEIVE_WATCHED_ASSET = 'RECEIVE_WATCHED_ASSET';
export const REMOVE_WATCHED_ASSET = 'REMOVE_WATCHED_ASSET';

export const ADD_BALANCE = 'ADD_BALANCE';
export const SUBTRACT_BALANCE = 'SUBTRACT_BALANCE';



const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveWatchedAsset = symbol => ({
  type: RECEIVE_WATCHED_ASSET,
  symbol
});

const removeWatchedAsset = symbol => ({
  type: REMOVE_WATCHED_ASSET,
  symbol
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS,
});

export const addBalance = amount => ({
  type: ADD_BALANCE,
  amount
});

export const subtractBalance = amount => ({
  type: SUBTRACT_BALANCE,
  amount
});


export const login = formUser => dispatch => {
  return SessionApiUtil.login(formUser)
  .then(user => {
    dispatch(removeErrors());
    dispatch(fetchPortfolioActions());
    return dispatch(receiveCurrentUser(user));
  })
  .fail(errors => dispatch(receiveErrors(extractErrors(errors))));
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout()
  .then(user => {
    dispatch(removeErrors());
    return dispatch(logoutCurrentUser());
  })
  .fail(errors => dispatch(receiveErrors(extractErrors(errors))));
};

export const signup = formUser => dispatch => {
  return SessionApiUtil.signup(formUser)
  .then(user => {
    dispatch(removeErrors());
    return dispatch(receiveCurrentUser(user));
  })
  .fail(errors => dispatch(receiveErrors(extractErrors(errors))));
};


export const addAssetToWatchlist = symbol => dispatch => {
  return WatchedAssetsApiUtil.addAssetToWatchlist(symbol)
  .then(() => dispatch(receiveWatchedAsset(symbol)));
};

export const removeAssetFromWatchlist = symbol => dispatch => {
  return WatchedAssetsApiUtil.removeAssetFromWatchlist(symbol)
    .then(() => dispatch(removeWatchedAsset(symbol)));
};

const extractErrors = errors => errors.responseJSON || ['Unknown Error'];
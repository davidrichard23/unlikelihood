import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

const removeErrors = () => ({
  type: REMOVE_ERRORS,
});


export const login = formUser => dispatch => {
  return SessionApiUtil.login(formUser)
  .then(user => {
    dispatch(removeErrors());
    return dispatch(receiveCurrentUser(user));
  })
  .fail(errors => dispatch(receiveErrors(extractErrors(errors))));
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout()
  .then(user => {
    dispatch(removeErrors());
    return dispatch(receiveCurrentUser(user));
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


const extractErrors = errors => errors.responseJSON || ['Unknown Error']
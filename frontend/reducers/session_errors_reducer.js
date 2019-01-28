import { RECEIVE_ERRORS, REMOVE_ERRORS } from '../actions/user_actions';

export default (state=[], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ERRORS: {
      return action.errors;
    }
    case REMOVE_ERRORS: {
      return [];
    }
  
    default:
      return state;
  }
}
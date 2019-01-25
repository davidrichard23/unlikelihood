import { combineReducers } from 'redux';
import EntitiesReducer from './entities_reducer';
import ErrorsReducer from './errors_reducer';
import SearchReducer from './search_reducer';

export default combineReducers({
  entities: EntitiesReducer,
  errors: ErrorsReducer,
  searchIds: SearchReducer,
});
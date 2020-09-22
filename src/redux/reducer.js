import { combineReducers } from 'redux-immutable';

import coursesReducer from '../reducer/courses';
import studentsReducer from '../reducer/students';

export default combineReducers({
  coursesReducer,
  studentsReducer,
});

import { combineReducers } from 'redux-immutable';

import quizReducer from '../reducer/quiz';
import coursesReducer from '../reducer/courses';
import studentsReducer from '../reducer/students';

export default combineReducers({
  quizReducer,
  coursesReducer,
  studentsReducer,
});

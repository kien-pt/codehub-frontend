import { combineReducers } from 'redux-immutable';

import quizReducer from '../reducer/quiz';
import coursesReducer from '../reducer/courses';
import studentsReducer from '../reducer/students';
import submissionsReducer from '../reducer/submissions';
import pointReducer from '../reducer/point';
import usersReducer from '../reducer/users';
import commentsReducer from '../reducer/comments';

export default combineReducers({
  quizReducer,
  coursesReducer,
  studentsReducer,
  submissionsReducer,
  pointReducer,
  usersReducer,
  commentsReducer,
});

import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { COURSES_API } from '../services/coursesAPI';

const GET_ALL_COURSES_LOADING = 'GET_ALL_COURSES_LOADING';
const GET_ALL_COURSES_SUCCESS = 'GET_ALL_COURSES_SUCCESS';
const GET_ALL_COURSES_FAILURE = 'GET_ALL_COURSES_FAILURE';

const INSERT_COURSES_LOADING = 'INSERT_COURSES_LOADING';
const INSERT_COURSES_SUCCESS = 'INSERT_COURSES_SUCCESS';
const INSERT_COURSES_FAILURE = 'INSERT_COURSES_FAILURE';

const GET_COURSE_BY_ID_LOADING = 'GET_COURSE_BY_ID_LOADING';
const GET_COURSE_BY_ID_SUCCESS = 'GET_COURSE_BY_ID_SUCCESS';
const GET_COURSE_BY_ID_FAILURE = 'GET_COURSE_BY_ID_FAILURE';

export const getCourseById = (id) => async (dispatch) => {
  const api = COURSES_API.getCourseById(id);
  dispatch({
    type: GET_COURSE_BY_ID_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_COURSE_BY_ID_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_COURSE_BY_ID_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
  }
};

export const getCourses = () => async (dispatch) => {
  const api = COURSES_API.getCourses();
  dispatch({
    type: GET_ALL_COURSES_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_ALL_COURSES_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_ALL_COURSES_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
  }
};

export const insertCourses = (payload) => async (dispatch) => {
  const api = COURSES_API.insertCourses();
  dispatch({
    type: INSERT_COURSES_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  console.log(response);
  if (!error && response.status === 200) {
    dispatch({
      type: INSERT_COURSES_SUCCESS,
      payload: [response.data],
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Thêm mới khoá học thành công!',
    });
  } else {
    dispatch({
      type: INSERT_COURSES_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Thêm mới khoá học thất bại!',
    });
  }
};

const initialState = fromJS({
  courses: [],
  isFetching: false,
});

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COURSES_LOADING:
    case GET_COURSE_BY_ID_LOADING:
    case INSERT_COURSES_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_ALL_COURSES_FAILURE:
    case GET_COURSE_BY_ID_FAILURE:
    case INSERT_COURSES_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_ALL_COURSES_SUCCESS:
      return state.merge({
        courses: [...action.payload.sort((a, b) => a.id - b.id)],
        isFetching: false,
      });

    case  GET_COURSE_BY_ID_LOADING:
      return state.merge({
        courses: [...state.get('courses'), action.payload],
        isFetching: false,
      });
    
    case INSERT_COURSES_SUCCESS:
      return state.merge({
        courses: [...state.get('courses'), ...action.payload],
        isFetching: false,
      });

    default: return state;
  }
}


import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { COURSES_API } from '../services/coursesAPI';

const GET_ALL_COURSES_LOADING = 'GET_ALL_COURSES_LOADING';
const GET_ALL_COURSES_SUCCESS = 'GET_ALL_COURSES_SUCCESS';
const GET_ALL_COURSES_FAILURE = 'GET_ALL_COURSES_FAILURE';

const INSERT_COURSE_LOADING = 'INSERT_COURSE_LOADING';
const INSERT_COURSE_SUCCESS = 'INSERT_COURSE_SUCCESS';
const INSERT_COURSE_FAILURE = 'INSERT_COURSE_FAILURE';

const DELETE_COURSE_LOADING = 'DELETE_COURSE_LOADING';
const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';
const DELETE_COURSE_FAILURE = 'DELETE_COURSE_FAILURE';

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

export const insertCourse = (payload) => async (dispatch) => {
  const api = COURSES_API.insertCourse();
  dispatch({
    type: INSERT_COURSE_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: INSERT_COURSE_SUCCESS,
      payload: [response.data],
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Thêm mới khoá học thành công!',
    });
  } else {
    dispatch({
      type: INSERT_COURSE_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Thêm mới khoá học thất bại!',
    });
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  const api = COURSES_API.deleteCourse(id);
  dispatch({
    type: DELETE_COURSE_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: DELETE_COURSE_SUCCESS,
      id,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Xoá khoá học thành công!',
    });
  } else {
    dispatch({
      type: DELETE_COURSE_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Xoá khoá học thất bại!',
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
    case INSERT_COURSE_LOADING:
    case DELETE_COURSE_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_ALL_COURSES_FAILURE:
    case GET_COURSE_BY_ID_FAILURE:
    case INSERT_COURSE_FAILURE:
    case DELETE_COURSE_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_ALL_COURSES_SUCCESS:
      return state.merge({
        courses: [...action.payload.sort((a, b) => a.id - b.id)],
        isFetching: false,
      });

    case  GET_COURSE_BY_ID_SUCCESS:
      return state.merge({
        courses: [...state.get('courses'), action.payload],
        isFetching: false,
      });
    
    case INSERT_COURSE_SUCCESS:
      return state.merge({
        courses: [...state.get('courses'), ...action.payload],
        isFetching: false,
      });

    case DELETE_COURSE_SUCCESS: {
      const newList = state.get('courses');
      const id = newList.findIndex((e) => e.id === action.id);
      newList.splice(id, 1);
      return state.merge({
        courses: [...newList],
        isFetching: false,
      });
    }

    default: return state;
  }
}


import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { COURSES_API } from '../services/coursesAPI';

import { getPointByCourseId } from '../reducer/point';

const GET_COURSES_LOADING = 'GET_COURSES_LOADING';
const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
const GET_COURSES_FAILURE = 'GET_COURSES_FAILURE';

export const getCourseById = (id) => async (dispatch) => {
  const api = COURSES_API.getCourseById(id);
  dispatch({
    type: GET_COURSES_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
    response.data.map((course) => dispatch(getPointByCourseId(course.id)))
  } else {
    dispatch({
      type: GET_COURSES_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
  }
};

export const getCourses = () => async (dispatch) => {
  const api = COURSES_API.getCourses();
  dispatch({
    type: GET_COURSES_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
    response.data.map((course) => dispatch(getPointByCourseId(course.id)))
  } else {
    dispatch({
      type: GET_COURSES_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
  }
};

const initialState = fromJS({
  courses: [],
  isFetching: false,
});

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_COURSES_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_COURSES_SUCCESS:
      return state.merge({
        courses: [...action.payload.sort((a, b) => a.id - b.id)],
        isFetching: false,
      });

    default: return state;
  }
}


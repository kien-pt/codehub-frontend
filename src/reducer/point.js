import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { POINT_API } from '../services/pointAPI';

const GET_POINT_LOADING = 'GET_POINT_LOADING';
const GET_POINT_SUCCESS = 'GET_POINT_SUCCESS';
const GET_POINT_FAILURE = 'GET_POINT_FAILURE';

export const getAllPoint = () => async (dispatch) => {
  const api = POINT_API.getAllPoint();
  dispatch({
    type: GET_POINT_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_POINT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_POINT_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
  }
};

export const getPointByCourseId = (id) => async (dispatch) => {
  const api = POINT_API.getPointByCourseId(id);
  dispatch({
    type: GET_POINT_LOADING,
    meta: { prefix: [PREFIX.COURSES, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_POINT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_POINT_FAILURE,
      meta: { prefix: [PREFIX.COURSES, PREFIX.API_FAILURE] },
    });
  }
};

const initialState = fromJS({
  point: [],
  isFetching: false,
});

export default function pointReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POINT_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_POINT_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_POINT_SUCCESS:
      return state.merge({
        point: [...action.payload],
        isFetching: false,
      });

    default: return state;
  }
}


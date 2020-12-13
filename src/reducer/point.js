import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { POINT_API } from '../services/pointAPI';

const RESET_USER_POINT = 'RESET_USER_POINT';

const GET_ALL_POINT_LOADING = 'GET_ALL_POINT_LOADING';
const GET_ALL_POINT_SUCCESS = 'GET_ALL_POINT_SUCCESS';
const GET_ALL_POINT_FAILURE = 'GET_ALL_POINT_FAILURE';

const GET_USER_POINT_LOADING = 'GET_USER_POINT_LOADING';
const GET_USER_POINT_SUCCESS = 'GET_USER_POINT_SUCCESS';
const GET_USER_POINT_FAILURE = 'GET_USER_POINT_FAILURE';

const GET_POINT_BY_USER_ID_LOADING = 'GET_POINT_BY_USER_ID_LOADING';
const GET_POINT_BY_USER_ID_SUCCESS = 'GET_POINT_BY_USER_ID_SUCCESS';
const GET_POINT_BY_USER_ID_FAILURE = 'GET_POINT_BY_USER_ID_FAILURE';

const GET_POINT_BY_QUIZ_ID_LOADING = 'GET_POINT_BY_QUIZ_ID_LOADING';
const GET_POINT_BY_QUIZ_ID_SUCCESS = 'GET_POINT_BY_QUIZ_ID_SUCCESS';
const GET_POINT_BY_QUIZ_ID_FAILURE = 'GET_POINT_BY_QUIZ_ID_FAILURE';

const INSERT_POINT_LOADING = 'INSERT_POINT_LOADING';
const INSERT_POINT_SUCCESS = 'INSERT_POINT_SUCCESS';
const INSERT_POINT_FAILURE = 'INSERT_POINT_FAILURE';

const UPDATE_POINT_LOADING = 'UPDATE_POINT_LOADING';
const UPDATE_POINT_SUCCESS = 'UPDATE_POINT_SUCCESS';
const UPDATE_POINT_FAILURE = 'UPDATE_POINT_FAILURE';

export const resetUserPoint = (size) => async (dispatch) => {
  dispatch({
    type: RESET_USER_POINT,
    meta: { prefix: [PREFIX.POINT, PREFIX.API_CALLING] },
  });
}

export const getAllPointByCourseId = (id) => async (dispatch) => {
  const api = POINT_API.getAllPointByCourseId(id);
  dispatch({
    type: GET_ALL_POINT_LOADING,
    meta: { prefix: [PREFIX.POINT, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_ALL_POINT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_ALL_POINT_FAILURE,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_FAILURE] },
    });
  }
};

export const getUserPointByCourseId = (id) => async (dispatch) => {
  const api = POINT_API.getAllPointByCourseId(id);
  dispatch({
    type: GET_USER_POINT_LOADING,
    meta: { prefix: [PREFIX.POINT, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_USER_POINT_SUCCESS,
      id,
      payload: response.data,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_USER_POINT_FAILURE,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_FAILURE] },
    });
  }
};

export const getPointByQuizId = (id) => async (dispatch) => {
  const api = POINT_API.getPointByQuizId(id);
  dispatch({
    type: GET_ALL_POINT_LOADING,
    meta: { prefix: [PREFIX.POINT, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_ALL_POINT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_ALL_POINT_FAILURE,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_FAILURE] },
    });
  }
};

export const getPointByUserId = (id) => async (dispatch) => {
  const api = POINT_API.getPointByUserId(id);
  dispatch({
    type: GET_POINT_BY_USER_ID_LOADING,
    meta: { prefix: [PREFIX.POINT, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_POINT_BY_USER_ID_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_POINT_BY_USER_ID_FAILURE,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_FAILURE] },
    });
  }
};

export const insertPoint = (payload) => async (dispatch) => {
  const api = POINT_API.insertPoint();
  dispatch({
    type: INSERT_POINT_LOADING,
    meta: { prefix: [PREFIX.POINT, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 201) {
    dispatch({
      type: INSERT_POINT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: INSERT_POINT_FAILURE,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_FAILURE] },
    });
  }
};

export const updatePoint = (id, payload) => async (dispatch) => {
  const api = POINT_API.updatePoint(id);
  dispatch({
    type: UPDATE_POINT_LOADING,
    meta: { prefix: [PREFIX.POINT, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: UPDATE_POINT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: UPDATE_POINT_FAILURE,
      meta: { prefix: [PREFIX.POINT, PREFIX.API_FAILURE] },
    });
  }
};

const initialState = fromJS({
  user_point: [],
  server_point: [],
  isFetching: false,
});

export default function pointReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POINT_LOADING:
    case GET_USER_POINT_LOADING:
    case GET_POINT_BY_USER_ID_LOADING:
    case GET_POINT_BY_QUIZ_ID_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_ALL_POINT_FAILURE:
    case GET_USER_POINT_FAILURE:
    case GET_POINT_BY_USER_ID_FAILURE:
    case GET_POINT_BY_QUIZ_ID_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case RESET_USER_POINT:
      return state.merge({
        user_point: [],
      });

    case GET_ALL_POINT_SUCCESS:
      return state.merge({
        server_point: [...action.payload],
        isFetching: false,
      });

    case GET_USER_POINT_SUCCESS:
      return state.merge({
        user_point: [...state.get('user_point'), {points: action.payload, courseId: action.id}],
        isFetching: false,
      });

    case GET_POINT_BY_USER_ID_SUCCESS:
      return state.merge({
        user_point: [...action.payload],
        isFetching: false,
      });

    case GET_POINT_BY_QUIZ_ID_SUCCESS:
      return state.merge({
        server_point: [...action.payload],
        isFetching: false,
      });

    default: return state;
  }
}


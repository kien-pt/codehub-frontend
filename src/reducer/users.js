import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import ROUTER from '../constant/router';
import { USERS_API } from '../services/usersAPI';

const LOGIN_LOADING = 'LOGIN_LOADING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const GET_ALL_USERS_LOADING = 'GET_ALL_USERS_LOADING';
const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';

const GET_USER_BY_ID_LOADING = 'GET_USER_BY_ID_LOADING';
const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE';

const INSERT_USER_LOADING = 'INSERT_USER_LOADING';
const INSERT_USER_SUCCESS = 'INSERT_USER_SUCCESS';
const INSERT_USER_FAILURE = 'INSERT_USER_FAILURE';

const DELETE_USER_LOADING = 'DELETE_USER_LOADING';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

const initialState = fromJS({
  user: null,
  usersList: [],
  notification: null,
  isFetching: false,
});

export const login = (history, payload) => async (dispatch) => {
  const api = USERS_API.login();
  dispatch({
    type: LOGIN_LOADING,
    meta: { prefix: [PREFIX.USER, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.USER, PREFIX.API_SUCCESS] },
    });
    history.push(ROUTER.HOME);
    return 'success';
  } else {
    dispatch({
      type: LOGIN_FAILURE,
      meta: { prefix: [PREFIX.USER, PREFIX.API_FAILURE] },
    });
    return 'error';
  }
};

export const getAllUsers = () => async (dispatch) => {
  const api = USERS_API.getAllUsers();
  dispatch({
    type: GET_ALL_USERS_LOADING,
    meta: { prefix: [PREFIX.USERS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_ALL_USERS_FAILURE,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_FAILURE] },
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  const api = USERS_API.getUserById(id);
  dispatch({
    type: GET_USER_BY_ID_LOADING,
    meta: { prefix: [PREFIX.USERS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_USER_BY_ID_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_USER_BY_ID_FAILURE,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_FAILURE] },
    });
  }
};

export const insertUser = (payload) => async (dispatch) => {
  const api = USERS_API.insertUser();
  dispatch({
    type: INSERT_USER_LOADING,
    meta: { prefix: [PREFIX.USERS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: INSERT_USER_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: error,
    });
  } else {
    dispatch({
      type: INSERT_USER_FAILURE,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'fail',
      message: error,
    });
  }
};

export const deletetUser = (id) => async (dispatch) => {
  const api = USERS_API.deletetUser(id);
  dispatch({
    type: DELETE_USER_LOADING,
    meta: { prefix: [PREFIX.USERS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: DELETE_USER_SUCCESS,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: error,
    });
  } else {
    dispatch({
      type: DELETE_USER_FAILURE,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'fail',
      message: error,
    });
  }
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
    case GET_USER_BY_ID_LOADING:
    case INSERT_USER_LOADING:
    case DELETE_USER_LOADING:
    case GET_ALL_USERS_LOADING:
      return state.merge({
        isFetching: true,
      });

    case LOGIN_FAILURE:
    case GET_USER_BY_ID_FAILURE:
    case INSERT_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case GET_ALL_USERS_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case LOGIN_SUCCESS: {
      const expiredTime = new Date();
      expiredTime.setHours(expiredTime.getHours() + 1);
      sessionStorage.setItem("expiredTime", expiredTime);
      sessionStorage.setItem("userId", action.payload.id);
      return state.merge({
        isFetching: false,
      });
    }

    case GET_USER_BY_ID_SUCCESS:
      return state.merge({
        user: action.payload,
        isFetching: false,
      });

    case INSERT_USER_SUCCESS:
      return state.merge({
        isFetching: false,
      });

    case GET_ALL_USERS_SUCCESS:
      return state.merge({
        usersList: [...action.payload],
        isFetching: false,
      });

    case DELETE_USER_SUCCESS:
      return state.merge({
        usersList: [...action.payload],
        isFetching: false,
      }); 

    default: return state;
  }
}

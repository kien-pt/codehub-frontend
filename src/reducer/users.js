import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import ROUTER from '../constant/router';
import { USERS_API } from '../services/usersAPI';

const LOGIN_LOADING = 'LOGIN_LOADING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const LOGOUT_LOADING = 'LOGOUT_LOADING';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const GET_ALL_USERS_LOADING = 'GET_ALL_USERS_LOADING';
const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';

const GET_USER_BY_ID_LOADING = 'GET_USER_BY_ID_LOADING';
const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE';

const INSERT_USER_LOADING = 'INSERT_USER_LOADING';
const INSERT_USER_SUCCESS = 'INSERT_USER_SUCCESS';
const INSERT_USER_FAILURE = 'INSERT_USER_FAILURE';

const UPDATE_USER_LOADING = 'UPDATE_USER_LOADING';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

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
    return 'success';
  } else {
    dispatch({
      type: LOGIN_FAILURE,
      meta: { prefix: [PREFIX.USER, PREFIX.API_FAILURE] },
    });
    return 'error';
  }
};

export const logout = (history) => async (dispatch) => {
  const api = USERS_API.logout();
  dispatch({
    type: LOGOUT_LOADING,
    meta: { prefix: [PREFIX.USER, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.USER, PREFIX.API_SUCCESS] },
    });
    history.push(ROUTER.LOGIN);
    return 'success';
  } else {
    dispatch({
      type: LOGOUT_FAILURE,
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

export const updateUser = (payload) => async (dispatch) => {
  const api = USERS_API.updateUser();
  dispatch({
    type: UPDATE_USER_LOADING,
    meta: { prefix: [PREFIX.USERS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Thay đổi thông tin thành công!',
    });
  } else {
    dispatch({
      type: UPDATE_USER_FAILURE,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'fail',
      message: 'Thay đổi thông tin thất bại!',
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const api = USERS_API.deleteUser(id);
  dispatch({
    type: DELETE_USER_LOADING,
    meta: { prefix: [PREFIX.USERS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: DELETE_USER_SUCCESS,
      id,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Xoá tài khoản thành công!',
    });
  } else {
    dispatch({
      type: DELETE_USER_FAILURE,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'fail',
      message: 'Xoá tài khoản thất bại!',
    });
  }
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
    case LOGOUT_LOADING:
    case GET_USER_BY_ID_LOADING:
    case INSERT_USER_LOADING:
    case UPDATE_USER_LOADING:
    case DELETE_USER_LOADING:
    case GET_ALL_USERS_LOADING:
      return state.merge({
        isFetching: true,
      });

    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case GET_USER_BY_ID_FAILURE:
    case INSERT_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case GET_ALL_USERS_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case LOGIN_SUCCESS: {
      const expiredTime = new Date();
      expiredTime.setHours(expiredTime.getHours() + 1);
      localStorage.setItem("expiredTime", expiredTime);
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("isAdmin", action.payload.admin);
      return state.merge({
        isFetching: false,
      });
    }

    case LOGOUT_SUCCESS: {
      localStorage.removeItem("userId");
      localStorage.removeItem("expiredTime");
      localStorage.removeItem("isAdmin");
      return state.merge({
        isFetching: false,
      });
    }

    case GET_USER_BY_ID_SUCCESS:
      return state.merge({
        user: {...action.payload},
        isFetching: false,
      });

    case INSERT_USER_SUCCESS:
      return state.merge({
        usersList: [...state.get("usersList"), ...[action.payload]],
        isFetching: false,
      });

    case GET_ALL_USERS_SUCCESS:
      return state.merge({
        usersList: [...action.payload],
        isFetching: false,
      });

    case UPDATE_USER_SUCCESS: {
      const newList = state.get('usersList');
      const id = newList.findIndex((e) => e.id === action.payload.id);
      const tempUser = {
        ...newList[id],
        username: action.payload.username,
        fullname: action.payload.fullname,
      }
      newList.splice(id, 1, tempUser);
      
      const newUser = state.get('user');
      if (newUser.id === action.payload.id) {
        newUser.username = action.payload.username;
        newUser.fullname = action.payload.fullname;
      }
      return state.merge({
        user: {...newUser},
        usersList: [...newList],
        isFetching: false,
      });
    }

    case DELETE_USER_SUCCESS: {
      const newList = state.get('usersList');
      const id = newList.findIndex((e) => e.id === action.id);
      newList.splice(id, 1);
      return state.merge({
        usersList: [...newList],
        isFetching: false,
      });
    }

    default: return state;
  }
}

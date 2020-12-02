import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import ROUTER from '../constant/router';
import { USERS_API } from '../services/usersAPI';

const LOGIN_LOADING = 'LOGIN_LOADING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const GET_USER_LOADING = 'GET_USER_LOADING';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILURE = 'GET_USER_FAILURE';

const INSERT_USER_LOADING = 'INSERT_USER_LOADING';
const INSERT_USER_SUCCESS = 'INSERT_USER_SUCCESS';
const INSERT_USER_FAILURE = 'INSERT_USER_FAILURE';

const initialState = fromJS({
  user: null,
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
  } else {
    dispatch({
      type: LOGIN_FAILURE,
      meta: { prefix: [PREFIX.USER, PREFIX.API_FAILURE] },
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  const api = USERS_API.getUserById(id);
  dispatch({
    type: GET_USER_LOADING,
    meta: { prefix: [PREFIX.USERS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_USER_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_USER_FAILURE,
      meta: { prefix: [PREFIX.USERS, PREFIX.API_FAILURE] },
    });
  }
};

export const insertUser = () => async (dispatch) => {
  dispatch({
    type: INSERT_USER_SUCCESS,
    // payload: response.data,
    meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
  });
  return ({
    type: 'success',
    message: 'OK',
  });
  // const api = USERS_API.insertUser();
  // dispatch({
  //   type: INSERT_USER_LOADING,
  //   meta: { prefix: [PREFIX.USERS, PREFIX.API_CALLING] },
  // });
  // const { response, error } = await apiCall({ ...api });
  // if (!error && response.status === 200) {
  //   dispatch({
  //     type: INSERT_USER_SUCCESS,
  //     payload: response.data,
  //     meta: { prefix: [PREFIX.USERS, PREFIX.API_SUCCESS] },
  //   });
  // } else {
  //   dispatch({
  //     type: INSERT_USER_FAILURE,
  //     meta: { prefix: [PREFIX.USERS, PREFIX.API_FAILURE] },
  //   });
  // }
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
    case GET_USER_LOADING:
    case INSERT_USER_LOADING:
      return state.merge({
        isFetching: true,
      });

    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case INSERT_USER_FAILURE:
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

    case GET_USER_SUCCESS:
      return state.merge({
        user: action.payload,
        isFetching: false,
      });

    case INSERT_USER_SUCCESS:
      return state.merge({
        // notification: notification(),
        isFetching: false,
      });


    default: return state;
  }
}

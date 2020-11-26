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

const initialState = fromJS({
  user: null,
  isFetching: false,
});

export const login = (history, payload) => async (dispatch) => {
  const api = USERS_API.login();
  dispatch({
    type: LOGIN_LOADING,
    meta: { prefix: [PREFIX.USER, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  console.log(payload, response);
  if (!error && response.status === 200) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.USER, PREFIX.API_SUCCESS] },
    });
    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("userId", response.data.user.id);
    // sessionStorage.setItem("userId", response.data.id);
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

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
    case GET_USER_LOADING:
      return state.merge({
        isFetching: true,
      });

    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case LOGIN_SUCCESS:
      return state.merge({
        isFetching: false,
      });

    case GET_USER_SUCCESS:
      return state.merge({
        user: action.payload,
        isFetching: false,
      });
    

    default: return state;
  }
}

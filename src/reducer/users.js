import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import ROUTER from '../constant/router';
import { USERS_API } from '../services/usersAPI';

const LOGIN_LOADING = 'LOGIN_LOADING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const initialState = fromJS({
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
    history.push(ROUTER.HOME);
  } else {
    dispatch({
      type: LOGIN_FAILURE,
      meta: { prefix: [PREFIX.USER, PREFIX.API_FAILURE] },
    });
  }
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return state.merge({
        isFetching: true,
      });

    case LOGIN_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case LOGIN_SUCCESS:
      return state.merge({
        isFetching: false,
      });

    default: return state;
  }
}

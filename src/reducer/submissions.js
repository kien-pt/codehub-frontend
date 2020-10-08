import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { SUBMISSIONS_API } from '../services/submissionsAPI';

const GET_SUBMISSIONS_LOADING = 'GET_SUBMISSIONS_LOADING';
const GET_SUBMISSIONS_SUCCESS = 'GET_SUBMISSIONS_SUCCESS';
const GET_SUBMISSIONS_FAILURE = 'GET_SUBMISSIONS_FAILURE';

export const getSubmissionsById = (id) => async (dispatch) => {
  const api = SUBMISSIONS_API.getSubmissionsById(id);
  dispatch({
    type: GET_SUBMISSIONS_LOADING,
    meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_SUBMISSIONS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_SUBMISSIONS_FAILURE,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_FAILURE] },
    });
  }
};

export const getSubmissionsByQuizId = (id) => async (dispatch) => {
  const api = SUBMISSIONS_API.getSubmissionsByQuizId(id);
  dispatch({
    type: GET_SUBMISSIONS_LOADING,
    meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_SUBMISSIONS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_SUBMISSIONS_FAILURE,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_FAILURE] },
    });
  }
};

const initialState = fromJS({
  submissions: [],
  isFetching: false,
});

export default function submissionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBMISSIONS_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_SUBMISSIONS_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_SUBMISSIONS_SUCCESS:
      return state.merge({
        submissions: [...action.payload.sort((a, b) => a.id - b.id)],
        isFetching: false,
      });

    default: return state;
  }
}
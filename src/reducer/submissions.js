import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { SUBMISSIONS_API } from '../services/submissionsAPI';

const SET_SOLVING = 'SET_SOLVING';

const GET_SUBMISSIONS_LOADING = 'GET_SUBMISSIONS_LOADING';
const GET_SUBMISSIONS_SUCCESS = 'GET_SUBMISSIONS_SUCCESS';
const GET_SUBMISSIONS_FAILURE = 'GET_SUBMISSIONS_FAILURE';

const GET_SUBMISSION_BY_ID_LOADING = 'GET_SUBMISSION_BY_ID_LOADING';
const GET_SUBMISSION_BY_ID_SUCCESS = 'GET_SUBMISSION_BY_ID_SUCCESS';
const GET_SUBMISSION_BY_ID_FAILURE = 'GET_SUBMISSION_BY_ID_FAILURE';

const INSERT_SUBMISSIONS_LOADING = 'INSERT_SUBMISSIONS_LOADING';
const INSERT_SUBMISSIONS_SUCCESS = 'INSERT_SUBMISSIONS_SUCCESS';
const INSERT_SUBMISSIONS_FAILURE = 'INSERT_SUBMISSIONS_FAILURE';

export const getSubmissionsById = (id) => async (dispatch) => {
  const api = SUBMISSIONS_API.getSubmissionsById(id);
  dispatch({
    type: GET_SUBMISSION_BY_ID_LOADING,
    meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_SUBMISSION_BY_ID_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_SUCCESS] },
    });
    return true;
  } else {
    dispatch({
      type: GET_SUBMISSION_BY_ID_FAILURE,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_FAILURE] },
    });
    return false;
  }
};

export const getSubmissionsByUserId = (id) => async (dispatch) => {
  const api = SUBMISSIONS_API.getSubmissionsByUserId(id);
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

export const getSubmissionsByCourseId = (id) => async (dispatch) => {
  const api = SUBMISSIONS_API.getSubmissionsByCourseId(id);
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

export const setSolving = () => async (dispatch) => {
  dispatch({
    type: SET_SOLVING,
    meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_CALLING] },
  });
};

export const insertSubmission = (history, payload) => async (dispatch) => {
  const api = SUBMISSIONS_API.insertSubmission();
  dispatch({
    type: INSERT_SUBMISSIONS_LOADING,
    meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });

  if (!error && response.status === 200) {
    dispatch({
      type: INSERT_SUBMISSIONS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: INSERT_SUBMISSIONS_FAILURE,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_FAILURE] },
    });
  }
};

const initialState = fromJS({
  submission: [],
  submissions: [],
  submissionsLength: 0,
  isFetching: false,
  isSolving: false,
});

export default function submissionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBMISSIONS_LOADING:
    case GET_SUBMISSION_BY_ID_LOADING:
    case INSERT_SUBMISSIONS_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_SUBMISSIONS_FAILURE:
    case GET_SUBMISSION_BY_ID_FAILURE:
    case INSERT_SUBMISSIONS_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_SUBMISSIONS_SUCCESS:
      return state.merge({
        submissions: [...action.payload.sort((a, b) => b.id - a.id)],
        isFetching: false,
      });

    case GET_SUBMISSION_BY_ID_SUCCESS:
      return state.merge({
        submission: [...[action.payload].sort((a, b) => b.id - a.id)],
        isFetching: false,
      });

    case SET_SOLVING:
      return state.merge({
        isSolving: true,
      });

    case INSERT_SUBMISSIONS_SUCCESS:
      return state.merge({
        submissions: [...[action.payload]],
        isFetching: false,
      });

    default: return state;
  }
}
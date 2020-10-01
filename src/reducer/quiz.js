import { fromJS } from 'immutable';

import { apiCall, runCode } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { QUIZ_API } from '../services/quizAPI';

const GET_QUIZ_LOADING = 'GET_QUIZ_LOADING';
const GET_QUIZ_SUCCESS = 'GET_QUIZ_SUCCESS';
const GET_QUIZ_FAILURE = 'GET_QUIZ_FAILURE';

const GET_TAGS_LOADING = 'GET_TAGS_LOADING';
const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';

const SUBMIT_CODE_LOADING = 'SUBMIT_CODE_LOADING';
const SUBMIT_CODE_SUCCESS = 'SUBMIT_CODE_SUCCESS';
const SUBMIT_CODE_FAILURE = 'SUBMIT_CODE_FAILURE';

export const getQuiz = () => async (dispatch) => {
  const api = QUIZ_API.getQuiz();
  dispatch({
    type: GET_QUIZ_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  console.log(response);
  if (!error && response.status === 200) {
    dispatch({
      type: GET_QUIZ_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_QUIZ_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
  }
};

export const getTags = () => async (dispatch) => {
  const api = QUIZ_API.getTags();
  dispatch({
    type: GET_TAGS_LOADING,
    meta: { prefix: [PREFIX.TAGS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_TAGS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_TAGS_FAILURE,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_FAILURE] },
    });
  }
};

export const submitCode = (sourceCode) => async (dispatch) => {
  const payload = {
    client_secret: process.env.REACT_APP_HACKEREARTH_CLIENT_SECRET,
    source: sourceCode,
    lang: 'CPP',
  };
  const api = QUIZ_API.runCode();
  const { response, error } = await apiCall({ ...api, payload });
  console.log(response, error);
};

const initialState = fromJS({
  tags: [],
  quiz: [],
  isFetching: false,
});

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUIZ_LOADING:
    case GET_TAGS_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_QUIZ_FAILURE:
    case GET_TAGS_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_QUIZ_SUCCESS:
      return state.merge({
        quiz: [...action.payload],
        isFetching: false,
      });

      case GET_TAGS_SUCCESS:
        return state.merge({
          tags: [...action.payload],
          isFetching: false,
        });

    default: return state;
  }
}


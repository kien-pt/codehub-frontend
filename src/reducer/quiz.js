import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import ROUTER from '../constant/router';
import { PREFIX } from '../constant/enum';
import { QUIZ_API } from '../services/quizAPI';

import { insertSubmission } from '../reducer/submissions';

const EMPTY_QUIZ_LIST = 'EMPTY_QUIZ_LIST';

const GET_ALL_QUIZ_LOADING = 'GET_ALL_QUIZ_LOADING';
const GET_ALL_QUIZ_SUCCESS = 'GET_ALL_QUIZ_SUCCESS';
const GET_ALL_QUIZ_FAILURE = 'GET_ALL_QUIZ_FAILURE';

const GET_QUIZ_BY_ID_LOADING = 'GET_QUIZ_BY_ID_LOADING';
const GET_QUIZ_BY_ID_SUCCESS = 'GET_QUIZ_BY_ID_SUCCESS';
const GET_QUIZ_BY_ID_FAILURE = 'GET_QUIZ_BY_ID_FAILURE';

const GET_QUIZ_BY_COURSE_ID_LOADING = 'GET_QUIZ_BY_COURSE_ID_LOADING';
const GET_QUIZ_BY_COURSE_ID_SUCCESS = 'GET_QUIZ_BY_COURSE_ID_SUCCESS';
const GET_QUIZ_BY_COURSE_ID_FAILURE = 'GET_QUIZ_BY_COURSE_ID_FAILURE';

const INSERT_QUIZ_LOADING = 'INSERT_QUIZ_LOADING';
const INSERT_QUIZ_SUCCESS = 'INSERT_QUIZ_SUCCESS';
const INSERT_QUIZ_FAILURE = 'INSERT_QUIZ_FAILURE';

const UPDATE_QUIZ_LOADING = 'UPDATE_QUIZ_LOADING';
const UPDATE_QUIZ_SUCCESS = 'UPDATE_QUIZ_SUCCESS';
const UPDATE_QUIZ_FAILURE = 'UPDATE_QUIZ_FAILURE';

const DELETE_QUIZ_LOADING = 'DELETE_QUIZ_LOADING';
const DELETE_QUIZ_SUCCESS = 'DELETE_QUIZ_SUCCESS';
const DELETE_QUIZ_FAILURE = 'DELETE_QUIZ_FAILURE';

const RESET_TEST_CASE_COUNT = 'RESET_TEST_CASE_COUNT';

const SUBMIT_CODE_LOADING = 'SUBMIT_CODE_LOADING';
const SUBMIT_CODE_SUCCESS = 'SUBMIT_CODE_SUCCESS';
const SUBMIT_CODE_FAILURE = 'SUBMIT_CODE_FAILURE';

var testCaseCount = 0;
var testCase = [];

const initialState = fromJS({
  quiz: [],
  comments: [],
  submission: null,
  testCaseCount: 0,
  testCase: [],
  isFetching: false,
  isSubmitting: false,
});

export const getAllQuiz = () => async (dispatch) => {
  const api = QUIZ_API.getAllQuiz();
  dispatch({
    type: GET_ALL_QUIZ_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_ALL_QUIZ_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_ALL_QUIZ_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
  }
};

export const getQuizById = (id) => async (dispatch) => {
  const api = QUIZ_API.getQuizById(id);
  dispatch({
    type: GET_QUIZ_BY_ID_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_QUIZ_BY_ID_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
    return true;
  } else {
    dispatch({
      type: GET_QUIZ_BY_ID_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
    return false;
  }
};

export const getQuizByCourseId = (id) => async (dispatch) => {
  const api = QUIZ_API.getQuizByCourseId(id);
  dispatch({
    type: GET_QUIZ_BY_COURSE_ID_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_QUIZ_BY_COURSE_ID_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_QUIZ_BY_COURSE_ID_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
  }
};

export const insertQuiz = (history, payload) => async (dispatch) => {
  const api = QUIZ_API.insertQuiz();
  dispatch({
    type: INSERT_QUIZ_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: INSERT_QUIZ_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
    history.push(`${ROUTER.QUIZ}/${response.data.id}`);
  } else {
    dispatch({
      type: INSERT_QUIZ_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
  }
};

export const updateQuiz = (history, payload) => async (dispatch) => {
  const api = QUIZ_API.updateQuiz();
  dispatch({
    type: UPDATE_QUIZ_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: UPDATE_QUIZ_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
    history.push(`${ROUTER.QUIZ}/${response.data.id}`);
  } else {
    dispatch({
      type: UPDATE_QUIZ_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
  }
};


export const deleteQuiz = (id) => async (dispatch) => {
  const api = QUIZ_API.deleteQuiz(id);
  dispatch({
    type: DELETE_QUIZ_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: DELETE_QUIZ_SUCCESS,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Xoá bài tập thành công!',
    });
  } else {
    dispatch({
      type: DELETE_QUIZ_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Xoá bài tập thất bại!',
    });
  }
};

export const resetTestCaseCount = (size) => async (dispatch) => {
  testCaseCount = size;
  testCase = [];
  dispatch({
    type: RESET_TEST_CASE_COUNT,
    payload: size,
    meta: { prefix: [PREFIX.TAGS, PREFIX.API_CALLING] },
  });
}

export const submitCode = (history, payload) => async (dispatch) => {
  const oPayload = {
    source: payload.sourceCode,
    lang: 'CPP',
    input: payload.input,
  };
  const api = QUIZ_API.runCode();
  dispatch({
    type: SUBMIT_CODE_LOADING,
    meta: { prefix: [PREFIX.TAGS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload: oPayload });
  if (!error && response.status === 200) {
    var got = String(response.data);
    while (got.slice(-1) === '\n') got = got.slice(0, -1);
    while (got.slice(-1) === ' ') got = got.slice(0, -1);
    while (got.slice(0) === ' ') got = got.slice(0, 1);
    dispatch({
      type: SUBMIT_CODE_SUCCESS,
      payload: {
        id: payload.id,
        got,
        expected: payload.output,
      },
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_SUCCESS] },
    });

    if (testCaseCount === 0) {
      var point = 0;
      testCase.forEach((e) => point += (e.got === e.expected) ? 1 : 0);
      point = parseFloat(((point / testCase.length) * 100).toFixed(0));

      var gotList = [];
      testCase.sort((a, b) => a.id - b.id).forEach((e) => gotList.push(e.got));
      dispatch(insertSubmission(
        history,
        {
          point,
          result: String(gotList),
          quizId: payload.quizId,
          sourceCode: payload.sourceCode,
        }
      ));
    }
  } else {
    dispatch({
      type: SUBMIT_CODE_FAILURE,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_FAILURE] },
    });
  }
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_QUIZ_LOADING:
    case GET_QUIZ_BY_ID_LOADING:
    case GET_QUIZ_BY_COURSE_ID_LOADING:
    case INSERT_QUIZ_LOADING:
    case UPDATE_QUIZ_LOADING:
    case DELETE_QUIZ_LOADING:
    case SUBMIT_CODE_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_ALL_QUIZ_FAILURE:
    case GET_QUIZ_BY_ID_FAILURE:
    case GET_QUIZ_BY_COURSE_ID_FAILURE:
    case INSERT_QUIZ_FAILURE:
    case INSERT_QUIZ_SUCCESS:
    case UPDATE_QUIZ_FAILURE:
    case UPDATE_QUIZ_SUCCESS:
    case DELETE_QUIZ_FAILURE:
    case SUBMIT_CODE_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_QUIZ_BY_ID_SUCCESS:
      return state.merge({
        comments: [...action.payload.comments],
        quiz: [...[action.payload]],
        testCase: [...action.payload.testCases],
        isFetching: false,
      });

      case RESET_TEST_CASE_COUNT:
        return state.merge({
          testCase: [],
          testCaseCount: action.payload,
        });

      case EMPTY_QUIZ_LIST: 
        return state.merge({
          quiz: [],
        });

      case GET_QUIZ_BY_COURSE_ID_SUCCESS:
        return state.merge({
          quiz: [...action.payload],
          isFetching: false,
        });

      case SUBMIT_CODE_SUCCESS: {
        testCaseCount = state.get('testCaseCount') - 1;
        testCase = [...state.get('testCase'), action.payload];
        return state.merge({
          testCaseCount: testCaseCount,
          testCase: testCase,
        });
      }

      case GET_ALL_QUIZ_SUCCESS:
        return state.merge({
          quiz: [...action.payload],
          isFetching: false,
        });
      
    default: return state;
  }
}


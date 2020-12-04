import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { QUIZ_API } from '../services/quizAPI';

import { insertSubmission } from '../reducer/submissions';

const EMPTY_QUIZ_LIST = 'EMPTY_QUIZ_LIST';

const GET_QUIZ_BY_ID_LOADING = 'GET_QUIZ_BY_ID_LOADING';
const GET_QUIZ_BY_ID_SUCCESS = 'GET_QUIZ_BY_ID_SUCCESS';
const GET_QUIZ_BY_ID_FAILURE = 'GET_QUIZ_BY_ID_FAILURE';

const GET_QUIZ_BY_TAG_ID_LOADING = 'GET_QUIZ_BY_TAG_ID_LOADING';
const GET_QUIZ_BY_TAG_ID_SUCCESS = 'GET_QUIZ_BY_TAG_ID_SUCCESS';
const GET_QUIZ_BY_TAG_ID_FAILURE = 'GET_QUIZ_BY_TAG_ID_FAILURE';

const GET_TAGS_LOADING = 'GET_TAGS_LOADING';
const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';

const RESET_TEST_CASE_COUNT = 'RESET_TEST_CASE_COUNT';

const SUBMIT_CODE_LOADING = 'SUBMIT_CODE_LOADING';
const SUBMIT_CODE_SUCCESS = 'SUBMIT_CODE_SUCCESS';
const SUBMIT_CODE_FAILURE = 'SUBMIT_CODE_FAILURE';

var testCaseCount = 0;
var testCase = [];

const initialState = fromJS({
  tags: [],
  quiz: [],
  submission: null,
  testCaseCount: 0,
  testCase: [],
  isFetching: false,
  isSubmitting: false,
});

// export const getQuiz = () => async (dispatch) => {
//   const api = QUIZ_API.getQuiz();
//   dispatch({
//     type: GET_QUIZ_LOADING,
//     meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
//   });
//   const { response, error } = await apiCall({ ...api });
//   if (!error && response.status === 200) {
//     dispatch({
//       type: GET_QUIZ_SUCCESS,
//       payload: response.data,
//       meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
//     });
//   } else {
//     dispatch({
//       type: GET_QUIZ_FAILURE,
//       meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
//     });
//   }
// };

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
      payload: [response.data],
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_QUIZ_BY_ID_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
  }
};

export const getQuizByTagId = (id) => async (dispatch) => {
  const api = QUIZ_API.getQuizByTagId(id);
  dispatch({
    type: GET_QUIZ_BY_TAG_ID_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_QUIZ_BY_TAG_ID_SUCCESS,
      payload: response.data.quizzes,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_QUIZ_BY_TAG_ID_FAILURE,
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
      payload: [response.data],
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_TAGS_FAILURE,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_FAILURE] },
    });
  }
};

export const getTagsByCourseId = (id) => async (dispatch) => {
  const api = QUIZ_API.getTagsByCourseId(id);
  dispatch({
    type: GET_TAGS_LOADING,
    meta: { prefix: [PREFIX.TAGS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_TAGS_SUCCESS,
      payload: response.data.tags,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_SUCCESS] },
    });
    dispatch({
      type: EMPTY_QUIZ_LIST,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
    response.data.tags.forEach((tag) => dispatch(getQuizByTagId(tag.id)))
  } else {
    dispatch({
      type: GET_TAGS_FAILURE,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_FAILURE] },
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

export const submitCode = (history, quizId, point, sourceCode, input, output) => async (dispatch) => {
  const payload = {
    client_secret: process.env.REACT_APP_HACKEREARTH_CLIENT_SECRET,
    source: sourceCode,
    lang: 'CPP',
    input: input,
  };
  const api = QUIZ_API.runCode();
  dispatch({
    type: SUBMIT_CODE_LOADING,
    meta: { prefix: [PREFIX.TAGS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    var get = String(response.data);
    while (get.slice(-1) === '\n') get = get.slice(0, -1);
    dispatch({
      type: SUBMIT_CODE_SUCCESS,
      payload: {
        get,
        want: output,
      },
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_SUCCESS] },
    });

    if (testCaseCount === 0) {
      dispatch(insertSubmission(
        history,
        point,
        {
          userId: parseInt(sessionStorage.getItem("userId")),
          quizId,
          testCase,
          sourceCode,
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
    case GET_QUIZ_BY_ID_LOADING:
    case GET_TAGS_LOADING:
    case GET_QUIZ_BY_TAG_ID_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_QUIZ_BY_ID_FAILURE:
    case GET_TAGS_FAILURE:
    case GET_QUIZ_BY_TAG_ID_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_QUIZ_BY_ID_SUCCESS:
      return state.merge({
        quiz: [...action.payload],
        isFetching: false,
      });

      case GET_TAGS_SUCCESS:
        return state.merge({
          tags: [...action.payload],
          isFetching: false,
        });
      
      case RESET_TEST_CASE_COUNT:
        return state.merge({
          testCaseCount: action.payload,
          testCase: [],
        });

      case SUBMIT_CODE_LOADING:
        return state.merge({
          isSubmitting: true,
        });

      case SUBMIT_CODE_FAILURE:
        return state.merge({
          isSubmitting: false,
        });

      case EMPTY_QUIZ_LIST: 
        return state.merge({
          quiz: [],
        });

      case GET_QUIZ_BY_TAG_ID_SUCCESS:
        return state.merge({
          quiz: [...state.get('quiz'), ...action.payload],
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

    default: return state;
  }
}


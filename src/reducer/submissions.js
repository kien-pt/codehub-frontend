import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { SUBMISSIONS_API } from '../services/submissionsAPI';

import { insertPoint, updatePoint } from './point';

const GET_SUBMISSIONS_LOADING = 'GET_SUBMISSIONS_LOADING';
const GET_SUBMISSIONS_SUCCESS = 'GET_SUBMISSIONS_SUCCESS';
const GET_SUBMISSIONS_FAILURE = 'GET_SUBMISSIONS_FAILURE';

const INSERT_SUBMISSIONS_LOADING = 'INSERT_SUBMISSIONS_LOADING';
const INSERT_SUBMISSIONS_SUCCESS = 'INSERT_SUBMISSIONS_SUCCESS';
const INSERT_SUBMISSIONS_FAILURE = 'INSERT_SUBMISSIONS_FAILURE';

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

export const insertSubmission = (pointData, payload) => async (dispatch) => {
  const api = SUBMISSIONS_API.insertSubmission();
  dispatch({
    type: INSERT_SUBMISSIONS_LOADING,
    meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 201) {
    dispatch({
      type: INSERT_SUBMISSIONS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_SUCCESS] },
    });
    var point = 0;
    response.data.testCase.forEach((e) => point += (e.get === e.want) ? 1 : 0);
    point = parseFloat(((point / response.data.testCase.length) * 100).toFixed(0));

    if (pointData.id === undefined) {
      dispatch(insertPoint({
        quizId: pointData.quizId,
        courseId: pointData.courseId,
        point,
      }));
    } else {
      if (point > pointData.point) {
        dispatch(updatePoint(
          pointData.id,
          {
            quizId: pointData.quizId,
            courseId: pointData.courseId,
            point,
          }
        ));  
      }
      
    }
  } else {
    dispatch({
      type: INSERT_SUBMISSIONS_FAILURE,
      meta: { prefix: [PREFIX.SUBMISSIONS, PREFIX.API_FAILURE] },
    });
  }
};

const initialState = fromJS({
  submissions: [],
  isFetching: false,
  isSolving: false,
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

    case INSERT_SUBMISSIONS_LOADING:
      return state.merge({
        isSolving: true,
      });

    case INSERT_SUBMISSIONS_FAILURE:
      return state.merge({
        isSolving: false,
      });

    case INSERT_SUBMISSIONS_SUCCESS: {
      return state.merge({
        submissions: [action.payload],
        isSolving: false,
      });
    }

    default: return state;
  }
}
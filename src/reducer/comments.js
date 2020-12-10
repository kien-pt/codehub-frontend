import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { COMMENTS_API } from '../services/commentsAPI';

import { getQuizById } from './quiz';

const INSERT_COMMENTS_LOADING = 'INSERT_COMMENTS_LOADING';
const INSERT_COMMENTS_SUCCESS = 'INSERT_COMMENTS_SUCCESS';
const INSERT_COMMENTS_FAILURE = 'INSERT_COMMENTS_FAILURE';

export const insertComment = (payload) => async (dispatch) => {
  const api = COMMENTS_API.insertComment();
  dispatch({
    type: INSERT_COMMENTS_LOADING,
    meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: INSERT_COMMENTS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_SUCCESS] },
    });
    dispatch(getQuizById(payload.quizId));
  } else {
    dispatch({
      type: INSERT_COMMENTS_FAILURE,
      meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_FAILURE] },
    });
  }
};

const initialState = fromJS({
  comments: [],
  isFetching: false,
});

export default function COMMENTSReducer(state = initialState, action) {
  switch (action.type) {
    case INSERT_COMMENTS_LOADING:
      return state.merge({
        isFetching: true,
      });

    case INSERT_COMMENTS_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case INSERT_COMMENTS_SUCCESS:
      return state.merge({
        isFetching: false,
      });

    default: return state;
  }
}


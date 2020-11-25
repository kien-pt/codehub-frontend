import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { COMMENTS_API } from '../services/commentsAPI';

const GET_COMMENTS_LOADING = 'GET_COMMENTS_LOADING';
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const getCommentsByQuizId = (id) => async (dispatch) => {
  const api = COMMENTS_API.getCommentsByQuizId(id);
  dispatch({
    type: GET_COMMENTS_LOADING,
    meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_COMMENTS_FAILURE,
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
    case GET_COMMENTS_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_COMMENTS_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_COMMENTS_SUCCESS:
      return state.merge({
        comments: [...action.payload],
        isFetching: false,
      });

    default: return state;
  }
}


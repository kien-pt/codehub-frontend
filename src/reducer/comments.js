import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { COMMENTS_API } from '../services/commentsAPI';

import { getQuizById } from './quiz';

const INSERT_COMMENT_LOADING = 'INSERT_COMMENT_LOADING';
const INSERT_COMMENT_SUCCESS = 'INSERT_COMMENT_SUCCESS';
const INSERT_COMMENT_FAILURE = 'INSERT_COMMENT_FAILURE';

const DELETE_COMMENT_LOADING = 'DELETE_COMMENT_LOADING';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const insertComment = (payload) => async (dispatch) => {
  const api = COMMENTS_API.insertComment();
  dispatch({
    type: INSERT_COMMENT_LOADING,
    meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: INSERT_COMMENT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_SUCCESS] },
    });
    dispatch(getQuizById(payload.quizId));
    return ({
      type: 'success',
      message: 'Thêm bình luận mới thành công!',
    });
  } else {
    dispatch({
      type: INSERT_COMMENT_FAILURE,
      meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Thêm bình luận mới thất bại!',
    });
  }
};

export const deleteComment = (id, quizId) => async (dispatch) => {
  const api = COMMENTS_API.deleteComment(id);
  dispatch({
    type: DELETE_COMMENT_LOADING,
    meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_SUCCESS] },
    });
    dispatch(getQuizById(quizId));
    return ({
      type: 'success',
      message: 'Xoá bình luận thành công!',
    });
  } else {
    dispatch({
      type: DELETE_COMMENT_FAILURE,
      meta: { prefix: [PREFIX.COMMENTS, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Xoá bình luận thất bại!',
    });
  }
};

const initialState = fromJS({
  comments: [],
  isFetching: false,
});

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case INSERT_COMMENT_LOADING:
    case DELETE_COMMENT_LOADING:
      return state.merge({
        isFetching: true,
      });

    case INSERT_COMMENT_FAILURE:
    case INSERT_COMMENT_SUCCESS:
    case DELETE_COMMENT_FAILURE:
    case DELETE_COMMENT_SUCCESS:
      return state.merge({
        isFetching: false,
      });

    default: return state;
  }
}


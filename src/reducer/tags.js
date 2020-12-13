import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import ROUTER from '../constant/router';
import { PREFIX } from '../constant/enum';
import { TAGS_API } from '../services/tagAPI';

import { insertSubmission } from '../reducer/submissions';

const GET_TAGS_LOADING = 'GET_TAGS_LOADING';
const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';

const INSERT_TAG_LOADING = 'INSERT_TAG_LOADING';
const INSERT_TAG_SUCCESS = 'INSERT_TAG_SUCCESS';
const INSERT_TAG_FAILURE = 'INSERT_TAG_FAILURE';

const UPDATE_TAG_LOADING = 'UPDATE_TAG_LOADING';
const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';
const UPDATE_TAG_FAILURE = 'UPDATE_TAG_FAILURE';

const DELETE_TAG_LOADING = 'DELETE_TAG_LOADING';
const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
const DELETE_TAG_FAILURE = 'DELETE_TAG_FAILURE';

var testCaseCount = 0;
var testCase = [];

const initialState = fromJS({
  tags: [],
  isFetching: false,
});

export const getTags = () => async (dispatch) => {
  const api = TAGS_API.getTags();
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

export const insertTag = (payload) => async (dispatch) => {
  const api = TAGS_API.insertTag();
  dispatch({
    type: INSERT_TAG_LOADING,
    meta: { prefix: [PREFIX.TAGS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: INSERT_TAG_SUCCESS,
      payload: [response.data],
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Thêm danh mục thành công!',
    });
  } else {
    dispatch({
      type: INSERT_TAG_FAILURE,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Thêm danh mục thất bại!',
    });
  }
};

export const updateTag = (payload) => async (dispatch) => {
  const api = TAGS_API.updateTag();
  dispatch({
    type: UPDATE_TAG_LOADING,
    meta: { prefix: [PREFIX.TAGS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: UPDATE_TAG_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Sửa danh mục thành công!',
    });
  } else {
    dispatch({
      type: UPDATE_TAG_FAILURE,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Sửa danh mục thất bại!',
    });
  }
};

export const deleteTag = (id) => async (dispatch) => {
  const api = TAGS_API.deleteTag(id);
  dispatch({
    type: DELETE_TAG_LOADING,
    meta: { prefix: [PREFIX.QUIZ, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: DELETE_TAG_SUCCESS,
      id,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_SUCCESS] },
    });
    return ({
      type: 'success',
      message: 'Xoá danh mục thành công!',
    });
  } else {
    dispatch({
      type: DELETE_TAG_FAILURE,
      meta: { prefix: [PREFIX.QUIZ, PREFIX.API_FAILURE] },
    });
    return ({
      type: 'error',
      message: 'Xoá danh mục thất bại!',
    });
  }
};

export const getTagsByCourseId = (id) => async (dispatch) => {
  const api = TAGS_API.getTagsByCourseId(id);
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
  } else {
    dispatch({
      type: GET_TAGS_FAILURE,
      meta: { prefix: [PREFIX.TAGS, PREFIX.API_FAILURE] },
    });
  }
};

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS_LOADING:
    case INSERT_TAG_LOADING:
    case UPDATE_TAG_LOADING:
    case DELETE_TAG_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_TAGS_FAILURE:
    case INSERT_TAG_FAILURE:
    case UPDATE_TAG_FAILURE:
    case DELETE_TAG_FAILURE:
      return state.merge({
        isFetching: false,
      });

      case GET_TAGS_SUCCESS:
        return state.merge({
          tags: [...action.payload],
          isFetching: false,
        });
      
      case INSERT_TAG_SUCCESS:
        return state.merge({
          tags: [...state.get('tags'), ...action.payload],
          isFetching: false,
        });

      case UPDATE_TAG_SUCCESS: {
        const newList = state.get('tags');
        const id = newList.findIndex((e) => e.id === action.payload.id);
        newList.splice(id, 1, action.payload);
        return state.merge({
          tags: [...newList],
          isFetching: false,
        });
      }

      case DELETE_TAG_SUCCESS: {
        const newList = state.get('tags');
        const id = newList.findIndex((e) => e.id === action.id);
        newList.splice(id, 1);
        return state.merge({
          tags: [...newList],
          isFetching: false,
        });
      }

    default: return state;
  }
}


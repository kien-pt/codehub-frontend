import { fromJS } from 'immutable';

import { apiCall } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { STUDENTS_API } from '../services/studentsAPI';

const GET_STUDENTS_LOADING = 'GET_STUDENTS_LOADING';
const GET_STUDENTS_SUCCESS = 'GET_STUDENTS_SUCCESS';
const GET_STUDENTS_FAILURE = 'GET_STUDENTS_FAILURE';

export const getStudents = () => async (dispatch) => {
  const api = STUDENTS_API.getStudents();
  dispatch({
    type: GET_STUDENTS_LOADING,
    meta: { prefix: [PREFIX.STUDENTS, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({
      type: GET_STUDENTS_SUCCESS,
      payload: response.data,
      meta: { prefix: [PREFIX.STUDENTS, PREFIX.API_SUCCESS] },
    });
  } else {
    dispatch({
      type: GET_STUDENTS_FAILURE,
      meta: { prefix: [PREFIX.STUDENTS, PREFIX.API_FAILURE] },
    });
  }
};

const initialState = fromJS({
  students: [],
  isFetching: false,
});

export default function StudentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS_LOADING:
      return state.merge({
        isFetching: true,
      });

    case GET_STUDENTS_FAILURE:
      return state.merge({
        isFetching: false,
      });

    case GET_STUDENTS_SUCCESS:
      return state.merge({
        students: action.payload,
        isFetching: false,
      });

    default: return state;
  }
}


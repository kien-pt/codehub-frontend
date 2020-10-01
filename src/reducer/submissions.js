import { fromJS } from 'immutable';

import { apiCall, runCode } from '../utils/api';
import { PREFIX } from '../constant/enum';
import { QUIZ_API } from '../services/quizAPI';

const GET_QUIZ_LOADING = 'GET_QUIZ_LOADING';
const GET_QUIZ_SUCCESS = 'GET_QUIZ_SUCCESS';
const GET_QUIZ_FAILURE = 'GET_QUIZ_FAILURE';
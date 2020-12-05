import HEADERS from '../constant/headers';

export const QUIZ_API = {
  getTags: () => ({
    endPoint: 'api/v1/tags',
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getTagsByCourseId: (id) => ({
    endPoint: `api/v1/tags/courses/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getAllQuiz: () => ({
    endPoint: 'api/v1/quizzes/all',
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getQuizById: (id) => ({
    endPoint: `api/v1/quizzes/id/?id=${1}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getQuizByTagId: (id) => ({
    endPoint: `api/v1/quizzes/tags/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  runCode: () => ({
    endPoint: 'api/v1/run',
    method: 'POST',
    headers: HEADERS.TOKEN_HEADER,
  })
};

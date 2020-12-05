import HEADERS from '../constant/headers';

export const QUIZ_API = {
  getTags: () => ({
    endPoint: 'api/v1/tags',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getTagsByCourseId: (id) => ({
    endPoint: `api/v1/tags/courses/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  insertTag: () => ({
    endPoint: 'api/v1/tags/new',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getAllQuiz: () => ({
    endPoint: 'api/v1/quizzes/all',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getQuizById: (id) => ({
    endPoint: `api/v1/quizzes/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getQuizByTagId: (id) => ({
    endPoint: `api/v1/quizzes/tags/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  runCode: () => ({
    endPoint: 'api/v1/run',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  })
};

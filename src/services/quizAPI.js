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
  getQuiz: () => ({
    endPoint: 'api/v1/quiz',
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getQuizById: (id) => ({
    endPoint: `api/v1/quiz/?id=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getQuizByCourseId: (id) => ({
    endPoint: `api/v1/quiz/?courseId=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  runCode: () => ({
    endPoint: 'api/v1/run',
    method: 'POST',
    headers: HEADERS.TOKEN_HEADER,
  })
};

import HEADERS from '../constant/headers';

export const QUIZ_API = {
  getTags: () => ({
    endPoint: 'api/v1/tags',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getTagsByCourseId: (id) => ({
    endPoint: `api/v1/tags/?courseId=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getQuiz: () => ({
    endPoint: 'api/v1/quiz',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getQuizByCourseId: (id) => ({
    endPoint: `api/v1/quiz/?courseId=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  runCode: () => ({
    endPoint: 'api/v1/run',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  })
};

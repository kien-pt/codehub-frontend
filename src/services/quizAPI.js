import HEADERS from '../constant/headers';

export const QUIZ_API = {
  /** TAGS */
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
  updateTag: () => ({
    endPoint: 'api/v1/tags/update',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  deleteTag: (id) => ({
    endPoint: `api/v1/tags/delete/id/?id=${id}`,
    method: 'DELETE',
    headers: HEADERS.DEFAULT_HEADER,
  }),

  /** QUIZZES */
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
  getQuizByCourseId: (id) => ({
    endPoint: `api/v1/quizzes/courses/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),

  /** RUN CODE */
  runCode: () => ({
    endPoint: 'api/v1/run',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  })
};

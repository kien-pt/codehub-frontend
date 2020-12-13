import HEADERS from '../constant/headers';

export const QUIZ_API = {
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
  insertQuiz: () => ({
    endPoint: 'api/v1/quizzes/new',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  updateQuiz: () => ({
    endPoint: 'api/v1/quizzes/update',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  deleteQuiz: (id) => ({
    endPoint: `api/v1/quizzes/delete/id/?id=${id}`,
    method: 'DELETE',
    headers: HEADERS.DEFAULT_HEADER,
  }), 

  /** RUN CODE */
  runCode: () => ({
    endPoint: 'api/v1/run',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  })
};

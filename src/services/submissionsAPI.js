import HEADERS from '../constant/headers';

export const SUBMISSIONS_API = {
  getSubmissionsById: (id) => ({
    endPoint: `api/v1/submissions/?id=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getSubmissionsByQuizId: (id) => ({
    endPoint: `api/v1/submissions/quizzes/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getSubmissionsByCourseId: (id) => ({
    endPoint: `api/v1/submissions/courses/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  insertSubmission: () => ({
    endPoint: `api/v1/submissions`,
    method: 'POST',
    headers: HEADERS.TOKEN_HEADER,
  })
};
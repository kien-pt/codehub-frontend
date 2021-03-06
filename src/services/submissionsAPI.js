import HEADERS from '../constant/headers';

export const SUBMISSIONS_API = {
  getSubmissionsById: (id) => ({
    endPoint: `api/v1/submissions/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getSubmissionsByUserId: (id) => ({
    endPoint: `api/v1/submissions/users/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getSubmissionsByQuizId: (id) => ({
    endPoint: `api/v1/submissions/quizzes/all/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getSubmissionsByCourseId: (id) => ({
    endPoint: `api/v1/submissions/courses/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  insertSubmission: () => ({
    endPoint: 'api/v1/submissions/new',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
};
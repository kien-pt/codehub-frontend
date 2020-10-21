import HEADERS from '../constant/headers';

export const SUBMISSIONS_API = {
  getSubmissionsById: (id) => ({
    endPoint: `api/v1/submissions/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getSubmissionsByQuizId: (id) => ({
    endPoint: `api/v1/submissions/?quizId=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  insertSubmission: () => ({
    endPoint: `api/v1/submissions`,
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  })
};
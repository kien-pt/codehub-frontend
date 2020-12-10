import HEADERS from '../constant/headers';

export const COMMENTS_API = {
  getCommentsByQuizId: (id) => ({
    endPoint: `api/v1/comments/?quizId=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  insertComment: () => ({
    endPoint: "api/v1/comments/new",
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
};

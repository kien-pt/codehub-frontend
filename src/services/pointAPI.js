import HEADERS from '../constant/headers';

export const POINT_API = {
  getAllPoint: () => ({
    endPoint: 'api/v1/point',
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getPointByQuizId: (id) => ({
    endPoint: `api/v1/point/?quizId=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  getPointByCourseId: (id) => ({
    endPoint: `api/v1/point/?courseId=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  }),
  insertPoint: () => ({
    endPoint: 'api/v1/point',
    method: 'POST',
    headers: HEADERS.TOKEN_HEADER,
  }),
  updatePoint: (id) => ({
    endPoint: `api/v1/point/${id}`,
    method: 'PUT',
    headers: HEADERS.TOKEN_HEADER,
  }),
};

import HEADERS from '../constant/headers';

export const POINT_API = {
  getAllPoint: () => ({
    endPoint: 'api/v1/point',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getPointByQuizId: (id) => ({
    endPoint: `api/v1/point/?quizId=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getUserPointByCourseId: (id) => ({
    endPoint: `api/v1/courses/points/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getAllPointByCourseId: (id) => ({
    endPoint: `api/v1/courses/points/all/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  insertPoint: () => ({
    endPoint: 'api/v1/point',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  updatePoint: (id) => ({
    endPoint: `api/v1/point/${id}`,
    method: 'PUT',
    headers: HEADERS.DEFAULT_HEADER,
  }),
};

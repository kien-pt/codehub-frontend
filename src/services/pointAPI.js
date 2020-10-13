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
  getPointByCourseId: (id) => ({
    endPoint: `api/v1/point/?courseId=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
};

import HEADERS from '../constant/headers';

export const COURSES_API = {
  getCourses: () => ({
    endPoint: 'api/v1/courses/all',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getCourseById: (id) => ({
    endPoint: `api/v1/courses/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  insertCourses: () => ({
    endPoint: 'api/v1/courses/new',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
};

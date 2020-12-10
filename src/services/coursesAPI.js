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
  insertCourse: () => ({
    endPoint: 'api/v1/courses/new',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  updateCourse: () => ({
    endPoint: 'api/v1/courses/update',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  deleteCourse: (id) => ({
    endPoint: `api/v1/courses/delete/id/?id=${id}`,
    method: 'DELETE',
    headers: HEADERS.DEFAULT_HEADER,
  })
};

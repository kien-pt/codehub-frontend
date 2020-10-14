import HEADERS from '../constant/headers';

export const COURSES_API = {
  getCourses: () => ({
    endPoint: 'api/v1/courses',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getCourseById: (id) => ({
    endPoint: `api/v1/courses/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
};

import HEADERS from '../constant/headers';

export const STUDENTS_API = {
  getStudents: () => ({
    endPoint: 'api/v1/students',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
};

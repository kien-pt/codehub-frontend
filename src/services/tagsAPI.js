import HEADERS from '../constant/headers';

export const TAGS_API = {
  getTags: () => ({
    endPoint: 'api/v1/tags/all',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getTagsByCourseId: (id) => ({
    endPoint: `api/v1/tags/courses/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  insertTag: () => ({
    endPoint: 'api/v1/tags/new',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  updateTag: () => ({
    endPoint: 'api/v1/tags/update',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  deleteTag: (id) => ({
    endPoint: `api/v1/tags/delete/id/?id=${id}`,
    method: 'DELETE',
    headers: HEADERS.DEFAULT_HEADER,
  }),
};

import HEADERS from '../constant/headers';

export const USERS_API = {
  login: () => ({
    endPoint: 'api/v1/login',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getAllUsers: (id) => ({
    endPoint: 'api/v1/users/all',
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getUserById: (id) => ({
    endPoint: `api/v1/users/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  insertUser: () => ({
    endPoint: 'api/v1/users/new',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  updateUser: () => ({
    endPoint: 'api/v1/users/update',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,  
  }),
  deleteUser: (id) => ({
    endPoint: `api/v1/users/delete/id/?id=${id}`,
    method: 'DELETE',
    headers: HEADERS.DEFAULT_HEADER,  
  })
};

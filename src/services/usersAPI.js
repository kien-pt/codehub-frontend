import HEADERS from '../constant/headers';

export const USERS_API = {
  login: () => ({
    endPoint: 'api/v1/login',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  }),
  getUserById: (id) => ({
    endPoint: `api/v1/users/id/?id=${id}`,
    method: 'GET',
    headers: HEADERS.TOKEN_HEADER,
  })
};

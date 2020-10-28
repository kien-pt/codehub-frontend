import HEADERS from '../constant/headers';

export const USERS_API = {
  login: () => ({
    endPoint: 'api/v1/login',
    method: 'POST',
    headers: HEADERS.DEFAULT_HEADER,
  })
};

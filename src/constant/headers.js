const HEADERS = {
  DEFAULT_HEADER: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  TOKEN_HEADER: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
};

export default HEADERS;

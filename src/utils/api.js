import axios from 'axios';

const parseParams = (params) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';

    if (!isParamTypeObject && typeof params[key] !== 'undefined' && params[key] !== '') {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && params[key] != null && params[key].length >= 0) {
      params[key].forEach((element) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

export const apiCall = async ({
  endPoint,
  method,
  payload,
  headers,
  params,
}) => {
  try {
    const result = await axios({
      method,
      url: process.env.REACT_APP_DOMAIN + endPoint,
      headers,
      data: payload,
      params,
      paramsSerializer: (params) => parseParams(params),
      withCredentials: true,
    });
    return {
      response: result,
      error: null,
    };
  } catch (e) {
    return {
      response: null,
      error: e.request,
    };
  }
};

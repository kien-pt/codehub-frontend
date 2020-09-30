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

export const runCode = async () => {
  try {
    const result = await fetch(
      "https://cors-anywhere.herokuapp.com/" + process.env.REACT_APP_HACKEREARTH_ENDPOINT,
      // 'https://cors-anywhere.herokuapp.com/https://api.hackerearth.com/v3/code/compile/',
      {
        method: "POST",
        body: JSON.stringify({
          client_secret: process.env.REACT_APP_HACKEREARTH_CLIENT_SECRET,
          source: 'int main() {   printf("Hello world\n");   return 0; }',
          lang: 'C',
        }),
      }
    );
    console.log("OK", result);
    // return {
    //   response: result,
    //   error: null,
    // };
  } catch (e) {
    console.log("NOT OK", e);
    // return {
    //   response: null,
    //   error: e.request,
    // };
  }
  // await fetch(
  //   process.env.REACT_APP_HACKEREARTH_ENDPOINT,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       client_secret: process.env.REACT_APP_HACKEREARTH_CLIENT_SECRET,
  //       source: 'int main() {   printf("Hello world\n");   return 0; }',
  //       lang: 'C',
  //     }),
  //     mode: "no-cors",
  //   }
  // ).then((response) => {
  //   console.log("OK", response);
  //   // return {
  //   //   response: response,
  //   //   error: null,
  //   // };
  // }).catch((error) => {
  //   console.log("NOT OK", error);
  //   // return {
  //   //   response: null,
  //   //   error: error,
  //   // };
  // });
};

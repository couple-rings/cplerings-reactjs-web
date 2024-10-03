import axios from "axios";
// import { store } from "../redux/store";

const backendUrl = "https://provinces.open-api.vn/api/";

const instance = axios.create({
  baseURL: backendUrl,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data ? response.data : response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // generic api error (server related) unexpected

      default: {
        return error.response?.data ? error.response.data : error;
      }
    }
  }
);

export default instance;

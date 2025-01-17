import axios, { AxiosError } from "axios";
import { logout, saveToken } from "src/redux/slice/auth.slice";
import { store } from "src/redux/store";
import { postRefreshToken } from "src/services/auth.service";
import { ErrorCode, ErrorType } from "src/utils/enums";
// import { store } from "../redux/store";

const publicRoute = ["auth/refresh", "designs/couple", "configurations"];

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: backendUrl,
  // withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.url) {
      const path = config.url.split("?")[0];
      if (!publicRoute.includes(path)) {
        const access_token = store.getState().auth.accessToken;
        config.headers["Authorization"] = "Bearer " + access_token;
      }
    }

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
  async function (error: AxiosError<IResponse<undefined>>) {
    if (error.response) {
      const { errors } = error.response.data;
      console.log(errors);
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // generic api error (server related) unexpected
      case 401: {
        return error.response?.data ? error.response.data : error;
      }

      case 400: {
        if (error.response && error.config) {
          const { errors } = error.response.data;

          if (errors) {
            for (const err of errors) {
              if (
                err.code === ErrorCode.JwtExpired &&
                err.type === ErrorType.Validation
              ) {
                if (error.config.url === "auth/refresh")
                  store.dispatch(logout());
                else {
                  const refreshToken = store.getState().auth.refreshToken;
                  const response = await postRefreshToken({ refreshToken });

                  if (response.data) {
                    const { token } = response.data;
                    error.config.headers["Authorization"] = `Bearer ${token}`;
                    store.dispatch(saveToken(response.data));

                    return Promise.reject(error);
                  }
                }
              }
            }
          }
        }

        return error.response?.data ? error.response.data : error;
      }

      case 403: {
        store.dispatch(logout());

        return error.response?.data ? error.response.data : error;
      }

      default: {
        return error.response?.data ? error.response.data : error;
      }
    }
  }
);

export default instance;

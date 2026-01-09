import Axios, { type InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
// import { paths } from "@/config/paths";
import { getAuthToken, removeAuthToken } from "@/utils/functions";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getAuthToken();

  if (config.headers) {
    config.headers.Accept = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    if (response.data?.page) {
      return response.data;
    }
    return response.data?.data ?? response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);

    if (error.response?.status === 401) {
      removeAuthToken();
      // const searchParams = new URLSearchParams();
      // const redirectTo =
      //   searchParams.get("redirectTo") || window.location.pathname;
      // window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  }
);


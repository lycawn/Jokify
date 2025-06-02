import axios from "axios";

const $axios = axios.create({
  baseURL: "https://official-joke-api.appspot.com",
});
$axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { $axios };

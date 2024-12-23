import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});
instance.interceptors.request.use(
  function (config) {
    let localStorageData = window.localStorage.getItem("persist:shop/users");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const accessToken = JSON.parse(localStorageData?.token);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return error.response?.data;
  }
);

export default instance;

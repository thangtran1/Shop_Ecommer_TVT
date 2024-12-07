import axios from "../axios";

export const apiRegister = (payload) =>
  axios({
    url: "/user/register/",
    method: "post",
    data: payload,
  });

export const apiFinalRegister = (token) =>
  axios({
    url: `/user/finalregister/${token}`,
    method: "put",
  });

export const apiLogin = (payload) =>
  axios({
    url: "/user/login/",
    method: "post",
    data: payload,
  });

export const apiForgotPassword = (payload) =>
  axios({
    url: "/user/forgot-password/",
    method: "post",
    data: payload,
  });

export const apiResetPassword = (payload) =>
  axios({
    url: "/user/reset-password/",
    method: "put",
    data: payload,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/user/current/",
    method: "get",
  });

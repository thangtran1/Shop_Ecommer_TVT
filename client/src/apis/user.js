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

export const apiGetUsers = (queries) =>
  axios({
    url: `/user/`,
    method: "get",
    params: queries,
  });

export const apiUpdateUser = (payload, uid) =>
  axios({
    url: `/user/` + uid,
    method: "put",
    data: payload,
  });

export const apiDeleteUser = (uid) =>
  axios({
    url: `/user/` + uid,
    method: "delete",
  });

export const apiUpdateCurrent = (payload) =>
  axios({
    url: "/user/current",
    method: "put",
    data: payload,
  });

export const apiUpdateCart = (payload) =>
  axios({
    url: "/user/cart",
    method: "put",
    data: payload,
  });
export const apiRemoveCart = (pid, color) =>
  axios({
    url: `/user/removecart/${pid}/${color}`,
    method: "delete",
  });

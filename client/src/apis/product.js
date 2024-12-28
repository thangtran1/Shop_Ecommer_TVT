import axios from "../axios";
export const apiGetProducts = (params) =>
  axios({
    url: "/product/",
    method: "get",
    params,
  });
export const apiGetProductDetail = (pid) =>
  axios({
    url: `/product/` + pid,
    method: "get",
  });
export const apiRatings = (data) =>
  axios({
    url: "/product/ratings",
    method: "put",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const apiCreateProduct = (data) =>
  axios({
    url: "/product/",
    method: "post",
    data,
  });
export const apiDeleteProduct = (pid) =>
  axios({
    url: `/product/` + pid,
    method: "delete",
  });
export const apiUpdateProduct = (payload, pid) => {
  return axios({
    url: `/product/` + pid.toString(),
    method: "put",
    data: payload,
  });
};
export const apiCreateOrder = (payload) => {
  return axios({
    url: "/order",
    method: "post",
    data: payload,
  });
};
export const apiGetUserOrders = (params) =>
  axios({
    url: "/order",
    method: "get",
    params,
  });
export const apiGetHotSaleProducts = () =>
  axios({
    url: "/product/hot-sale",
    method: "get",
  });

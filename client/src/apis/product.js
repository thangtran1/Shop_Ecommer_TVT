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
  console.log("Payload to be sent:", payload); // Log payload để kiểm tra
  return axios({
    url: `/product/` + pid.toString(), // Đảm bảo pid là chuỗi
    method: "put",
    data: payload, // Gửi payload đúng định dạng
  });
};

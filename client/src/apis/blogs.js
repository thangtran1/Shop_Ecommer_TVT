import axios from "../axios";
export const apiGetBlogs = (params) =>
  axios({
    url: "/blog/",
    method: "get",
    params,
  });
export const apiGetBlogDetail = (bid) =>
  axios({
    url: `/blog/${bid}`,
    method: "get",
  });

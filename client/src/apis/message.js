import axios from "../axios";
export const sendMessage = async (data) => {
  const res = await axios.post("/conversation/user/send", data);
  return res;
};
export const replyMessage = async (message) => {
  const res = await axios.post("/conversation/admin/send", message);
  return res;
};
export const fetchMessages = async (userId) => {
  const res = await axios.get(`/conversation/${userId}`);
  return res;
};
export const getAllUsers = async () => {
  const res = await axios.get(`/conversation`);
  return res;
};

import icons from "./icons";
import moment from "moment";
const { MdOutlineStarBorder, MdOutlineStar } = icons;
export const createSlug = (string) =>
  string
    .toLowerCase() // Sửa thành toLowerCase
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Sửa phạm vi unicode
    .split(" ")
    .join("-");

export const formatMoney = (number) => {
  if (number === undefined || number === null) return "0";
  return Number(number.toFixed(1)).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const renderStarFromNumber = (number) => {
  if (!Number(number)) return;
  const stars = [];
  for (let i = 0; i < +number; i++)
    stars.push(<MdOutlineStar key={`filled-${i}`} color="orange" />);
  for (let i = 5; i > +number; i--)
    stars.push(<MdOutlineStarBorder key={`empty-${i}`} color="orange" />);

  return stars;
};

export const validate = (payload, setInValidFields) => {
  let invalidCount = 0;
  const invalidFields = []; // Danh sách các trường không hợp lệ

  for (let [key, value] of Object.entries(payload)) {
    if (typeof value === "string" && value.trim() === "") {
      invalidFields.push({ name: key, message: `${key} is required.` });
      invalidCount++;
    } else if (value === undefined || value === null) {
      invalidFields.push({ name: key, message: `${key} is required.` });
      invalidCount++;
    }
  }

  setInValidFields(invalidFields); // Gán danh sách các trường không hợp lệ vào state
  return invalidCount;
};

export const formatPrice = (price) => {
  return price.toLocaleString("vi-VN", { currency: "VND" });
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export const fileToBase64 = (file) => {
  if (!file) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const formatMessageDate = (createdAt) => {
  if (!createdAt) return "N/A";

  const date = moment(createdAt);

  if (!date.isValid()) return "Invalid Date";

  return date.format("hh:mm A");
};

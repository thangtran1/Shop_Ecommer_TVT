import icons from "./icons";

const { MdOutlineStarBorder, MdOutlineStar } = icons;
export const createSlug = (string) =>
  string
    .toLowerCase() // Sửa thành toLowerCase
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Sửa phạm vi unicode
    .split(" ")
    .join("-");

export const formatMoney = (number) =>
  Number(number.toFixed(1)).toLocaleString();

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
  const formatPayload = Object.entries(payload);

  for (let array of formatPayload) {
    if (array[1].trim() === "") {
      invalidCount++;
    }
  }

  setInValidFields(invalidCount);
  return invalidCount;
};

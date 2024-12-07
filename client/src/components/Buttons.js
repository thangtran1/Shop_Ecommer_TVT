import React from "react";

const Buttons = ({
  name,
  fw,
  handleOnclick,
  style,
  iconsBefore,
  iconsAfter,
}) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : `hover:bg-gray-800 hover:text-white transition-all duration-300  px-4 my-2 py-2 rounded-md text-white bg-main text-semibold ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnclick && handleOnclick();
      }}
    >
      <span>{iconsBefore}</span>
      <span>{name}</span>
      <span>{iconsAfter}</span>
    </button>
  );
};

export default Buttons;

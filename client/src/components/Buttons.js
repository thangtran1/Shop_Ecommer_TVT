import React from "react";
const Buttons = ({ children, fw, handleOnclick, style, type = "button" }) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : `hover:bg-gray-800 hover:text-white transition-all duration-300  px-4 my-2 py-3 rounded-md text-white bg-main text-semibold ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnclick && handleOnclick();
      }}
    >
      {children}
    </button>
  );
};
export default Buttons;

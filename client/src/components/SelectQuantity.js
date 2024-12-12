import React, { memo } from "react";

const SelectQuantity = ({ quantity, handleChangeQuantity, handleQuantity }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className="cursor-pointer text-[24px] p-2 border-r border-black"
        onClick={() => handleChangeQuantity("decrease")}
      >
        -
      </span>
      <input
        className="outline-none text-center w-10"
        type="text"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <span
        className="cursor-pointer text-[24px] p-2 border-l border-black"
        onClick={() => handleChangeQuantity("increase")}
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);

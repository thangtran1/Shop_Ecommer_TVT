import React from "react";
import withBase from "hocs/withBase";
const ProductItem = ({ title, sub, icon }) => {
  return (
    <div className="flex items-center gap-4 p-3 border mb-[10px]">
      <span className=" p-2 bg-gray-800 rounded-full text-white flex items-center justify-center">
        {icon}
      </span>
      <div className="flex flex-col text-sm text-gray-500">
        <h3 className=" font-medium">{title}</h3>
        <p className="text-xs">{sub}</p>
      </div>
    </div>
  );
};

export default withBase(ProductItem);

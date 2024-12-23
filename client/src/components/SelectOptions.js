import React from "react";
const SelectOptions = ({ icon }) => {
  return (
    <div className="cursor-pointer w-10 h-10 bg-white rounded-full border shadow-md flex items-center justify-center hover:bg-gray-800 hover:text-white border-gray-200">
      {icon}
    </div>
  );
};
export default SelectOptions;

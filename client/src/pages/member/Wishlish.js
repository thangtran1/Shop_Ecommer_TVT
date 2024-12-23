import React from "react";
import { useSelector } from "react-redux";
import Product from "components/Products/Product";
import { Buttons } from "components";
const Wishlish = () => {
  const { current } = useSelector((state) => state.user);
  console.log(current, "current");

  return (
    <div className="w-full relative px-4 ">
      <header className="py-4 border-b border-gray-600 text-3xl font-bold">
        Wishlish
      </header>
      <div className="w-full p-5 flex flex-wrap gap-4">
        {current?.wishlist?.map((el) => (
          <div
            className="bg-white py-3  w-[285px]  rounded-md drop-shadow-md flex flex-col gap-3"
            key={el._id}
          >
            <Product productData={el} pid={el._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlish;

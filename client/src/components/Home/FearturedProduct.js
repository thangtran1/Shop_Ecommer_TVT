import React, { useState, useEffect } from "react";
// import { ProductCard } from "./";
import section1 from "assets/section1.png";
import section2 from "assets/section2.png";
import section3 from "assets/section3.png";
import section4 from "assets/section4.png";
import { apiGetProducts } from "apis";
import ProductCard from "../ProductCard";
const FearturedProduct = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({
      limit: 9,
      sort: "-totalRatings",
      //   page: Math.random() * 3,
      // totalRatings: 5,
    });
    if (response?.success) setProducts(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px] ">
        {products?.map((el) => (
          <ProductCard
            key={el._id}
            thumb={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-[20px]">
        <img
          className="w-full h-full object-cover col-span-2 row-span-2"
          src={section1}
          alt="section1"
        />
        <img
          className="w-full h-full object-cover col-span-1 row-span-1"
          src={section2}
          alt="section2"
        />
        <img
          className="w-full h-full object-cover col-span-1 row-span-2"
          src={section4}
          alt="section4"
        />
        <img
          className="w-full h-full object-cover col-span-1 row-span-1"
          src={section3}
          alt="section3"
        />
      </div>
    </div>
  );
};

export default FearturedProduct;

import React, { useState, useEffect, memo } from "react";
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
            pid={el._id}
            category={el.category}
            title={el.title}
            thumb={el.thumb}
            price={el.price}
            productData={el}
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
export default memo(FearturedProduct);

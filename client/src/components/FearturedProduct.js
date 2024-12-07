import React, { useState, useEffect } from "react";
// import { ProductCard } from "./";
import section1 from "../assets/section1.png";
import section2 from "../assets/section2.png";
import section3 from "../assets/section3.png";
import section4 from "../assets/section4.png";
import { apiGetProducts } from "../apis";
import ProductCard from "./ProductCard";
const FearturedProduct = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({
      limit: 9,
      //   page: Math.random() * 3,
      totalRatings: 5,
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
      <div className="flex justify-between  mt-[20px]">
        <img
          src={section1}
          alt=" section1"
          className="w-[50%] object-contain"
        />
        <div className="flex flex-col justify-between w-[24%]">
          <img src={section2} alt="section4" />
          <img src={section3} alt="section2" />
        </div>
        <img
          src={section4}
          alt=" section3"
          className=" w-[24%] object-contain"
        />
      </div>
    </div>
  );
};

export default FearturedProduct;

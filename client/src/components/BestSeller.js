import React, { useEffect, useState } from "react";
import { apiGetProducts } from "apis/product";
import { Product, CustomSlider } from ".";
import banner1 from "assets/banner1.png";
import banner2 from "assets/banner2.png";
import { apiGetNewProducts } from "store/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";
const tabs = [
  {
    id: 1,
    name: "best seller",
  },
  {
    id: 2,
    name: "new arrivals",
  },
];
const BestSeller = () => {
  const [bestSellers, setbestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.product);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    if (response?.success) {
      setbestSellers(response.products);
      setProducts(response.products);
    }
  };

  useEffect(() => {
    fetchProducts();
    dispatch(apiGetNewProducts());
  }, [dispatch]);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab, bestSellers, newProducts]);
  return (
    <div>
      <div className="flex text-[20px]  ml-[-32px] ">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold pr-8 px-8 cursor-pointer uppercase  border-r text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="border-t-2 border-main mt-4"></div>
      <div className="mt-4 mx-[-10px] ">
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src={banner1}
          alt="banner1"
          className="flex-1 object-contain border"
        />
        <img
          src={banner2}
          alt="banner2"
          className="flex-1 object-contain border"
        />
      </div>
    </div>
  );
};

export default BestSeller;

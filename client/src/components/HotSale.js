import React, { useEffect, useState } from "react";
import withBase from "hocs/withBase";
import hotSale from "assets/BannerHome/hot-sale.png";
import { apiGetHotSaleProducts } from "apis";
import CustomSlider from "./CustomSlider";

const HotSale = () => {
  const [products, setProducts] = useState(null);
  const [currentTab, setCurrentTab] = useState("Điện thoại, Tablet");

  const fetchProducts = async (category) => {
    const response = await apiGetHotSaleProducts(category); // Truyền category để lấy sản phẩm theo tab
    if (response?.success) {
      setProducts(response.hotSaleProducts);
    }
  };

  useEffect(() => {
    fetchProducts(currentTab);
  }, [currentTab]);

  const tabs = ["Điện thoại, Tablet", "Phụ kiện, TV", "Gia dụng"];

  return (
    <div>
      <div className="flex text-[20px] ">
        <span>Hot Sale</span>
      </div>
      <div className="border-t-2  border-main mt-4"></div>
      <div className="mt-4 main-bg rounded-lg ">
        <div className="flex justify-between items-center px-4 py-2">
          <span>
            <img src={hotSale} alt="hotSale" className="w-[460px] h-[60px]" />
          </span>
          <span className="flex gap-[10px] flex-wrap ">
            {tabs.map((tab) => (
              <span
                key={tab}
                className={`px-2 py-2 rounded-md cursor-pointer ${
                  currentTab === tab
                    ? "bg-[#fff0bf] text-black font-semibold"
                    : "bg-white"
                }`}
                onClick={() => setCurrentTab(tab)}
              >
                {tab}
              </span>
            ))}
          </span>
        </div>
        {products && <CustomSlider products={products} normal={true} />}
      </div>
    </div>
  );
};

export default withBase(HotSale);

import React, { useState } from "react";
import { formatMoney } from "../ultils/helper";
import label from "../assets/label.webp";
// import label2 from "../assets/label2.png";
import { renderStarFromNumber } from "../ultils/helper";
import { SelectOptions } from "./";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
const { FaEye, IoMdMenu, IoMdHeart } = icons;
const Product = ({ productData, isNew, normal }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full text-base  px-[10px]">
      <Link
        to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
          productData?.title
        }`}
        className="w-full border p-[15px] flex flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="gap-3 left-0 right-0 absolute bottom-[-10px] flex items-center justify-center animate-slide-top">
              <SelectOptions icon={<IoMdHeart />} />
              <SelectOptions icon={<IoMdMenu />} />
              <SelectOptions icon={<FaEye />} />
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s"
            }
            alt="Img Best Seller"
            className="w-[274px] h-[274px] object-cover"
          />
          {!normal && (
            <img
              src={isNew ? label : label}
              alt="label"
              className={`w-[120px] top-[-32px] left-[-42px]  object-contain absolute`}
            />
          )}
          <span
            className={`font-bold absolute  top-[-10px] left-[-12px] text-white ${
              isNew ? "" : "text-sm"
            }`}
          >
            {isNew ? "New" : "Trending"}
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRatings)}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;

import React from "react";
import { formatMoney, renderStarFromNumber } from "ultils/helper";
import withBase from "hocs/withBase";
const ProductCard = ({
  title,
  totalRatings,
  price,
  thumb,
  category,
  productData,
  discountPercentage,
  navigate,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/${category?.toLowerCase()}/${productData?._id}/${title}`);
      }}
      className="w-1/3 cursor-pointer flex-auto px-[10px] mt-[20px]  "
    >
      <div className="flex border">
        <img
          src={thumb}
          alt="products"
          className="w-[120px]  object-contain p-4"
        />
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs">
          <span className="line-clamp-1 text-sm capitalize ">
            {title.toLowerCase()}
          </span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRatings, 14)}
          </span>
          <span>{`${formatMoney(price)} VND`}</span>
          {discountPercentage > 0 && (
            <span className="text-green-500">{`Giảm ${discountPercentage}%`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default withBase(ProductCard);

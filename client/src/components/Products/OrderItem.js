import React, { useCallback, useState, useEffect } from "react";
import { formatMoney } from "ultils/helper";
import SelectQuantity from "components/DetailProduct/SelectQuantity";
import { updateCart } from "store/user.js/userSlice";
import withBase from "hocs/withBase";
const OrderItem = ({ item, defaultQuantity = 1, dispatch }) => {
  const [quantity, setQuantity] = useState(() => defaultQuantity);
  const handleQuantity = (id, value) => {
    setQuantity(Math.max(1, parseInt(value) || 1));
  };
  const handleChangeQuantity = useCallback((id, flag) => {
    setQuantity((prev) => {
      return flag === "increase" ? prev + 1 : Math.max(1, prev - 1);
    });
  }, []);
  useEffect(() => {
    dispatch(
      updateCart({ _id: item.product._id, quantity, color: item.color })
    );
  }, [quantity]);
  return (
    <div className="w-main mx-auto border py-3 font-semibold grid grid-cols-10">
      <div className="flex gap-2 col-span-6 items-center">
        <img
          src={item?.product?.thumb}
          alt={item?.product?.title}
          className="w-48 h-48 object-cover"
        />
        <div className="flex flex-col gap-1 items-start">
          <span className="text-main text-sm">{item?.product?.title}</span>
          <span className="text-sm">{item?.color}</span>
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <SelectQuantity
          quantity={quantity}
          handleChangeQuantity={(flag) => handleChangeQuantity(item._id, flag)}
          handleQuantity={(value) => handleQuantity(item._id, value)}
        />
      </div>
      <div className="col-span-2 text-center">
        {formatMoney(item?.product?.price * quantity)}
      </div>
    </div>
  );
};
export default withBase(OrderItem);

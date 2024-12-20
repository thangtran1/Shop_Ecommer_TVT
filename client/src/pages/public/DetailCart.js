import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "components/Breadcrumb";
import withBase from "hocs/withBase";
import { formatMoney } from "ultils/helper";
import OrderItem from "components/Products/OrderItem";
import Buttons from "components/Buttons";
import { Link } from "react-router-dom";
import path from "ultils/path";
const DetailCart = ({ location }) => {
  const { currentCart } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState(currentCart || []);
  console.log("currentCart", currentCart);

  return (
    <div className="w-full">
      {/* Header Breadcrumb */}
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="text-2xl font-semibold uppercase">My Cart</h3>
          {/* <Breadcrumb
            category={location?.pathname?.split("/", "")?.slice("-")?.join(" ")}
          /> */}
        </div>
      </div>

      <div className="w-main bg-gray-200 mx-auto my-8 border py-3 font-semibold grid grid-cols-10">
        <span className="col-span-6 text-center">Products</span>
        <span className="col-span-1 text-center">Quantity</span>
        <span className="col-span-2 text-center">Price</span>
      </div>

      {cartItems.map((item) => (
        <OrderItem item={item} key={item._id} defaultQuantity={item.quantity} />
      ))}
      <div className="w-main mx-auto">
        <div className="flex  flex-col px-8  justify-end my-8  border-t border-gray-300">
          <div className="flex flex-col gap-2">
            <div className="flex justify-end  gap-16">
              <span>SubTotal: </span>
              <span>
                {formatMoney(
                  currentCart?.reduce(
                    (acc, el) => acc + el?.product?.price * el?.quantity,
                    0
                  )
                )}
              </span>
            </div>
            <div className="flex justify-end">
              <span>
                Shipping, taxes, and discounts calculated at checkout.
              </span>
            </div>

            <span className="flex justify-end">
              <Link
                target="_blank"
                className="bg-main text-white px-4 py-2 rounded-md"
                to={`/${path.CHECKOUT}`}
              >
                Checkout
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(DetailCart);

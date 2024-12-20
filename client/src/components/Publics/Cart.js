import React from "react";
import { IoClose } from "react-icons/io5";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helper";
import Buttons from "components/Buttons";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { apiRemoveCart } from "apis/user";
import { getCurrent } from "store/user.js/asyncAction";
import { toast } from "react-toastify";
import path from "ultils/path";
import { useNavigate } from "react-router-dom";
import { showCart } from "store/app/appReducer";
const Cart = (props) => {
  const navigate = useNavigate();
  const { currentCart } = useSelector((state) => state.user);
  console.log("12313123123", currentCart);

  const deleteCart = async (pid, color) => {
    console.log("pid", pid);
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      toast.success(response.message);
      props.dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="grid grid-rows-10 w-[400px] h-screen bg-gray-600 text-white rounded-lg p-5"
    >
      <header className="row-span-1 h-full border-b border-gray-300 flex justify-between  items-center font-bold text-2xl">
        <span className="bg-none">Your Cart</span>
        <span onClick={() => props.dispatch(showCart())}>
          <IoClose className="cursor-pointer p-2" size={34} />
        </span>
      </header>
      <section className="row-span-7 gap-3 flex flex-col h-full  max-h-full overflow-y-auto py-3">
        {!currentCart && (
          <span className="text-xs italic">Your cart is empty</span>
        )}
        {currentCart &&
          currentCart?.map((el) => (
            <div
              key={el._id}
              className="flex gap-2 justify-between items-center"
            >
              <div className="flex gap-2">
                <img
                  src={el?.product?.thumb}
                  alt={el?.product?.title}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className=" text-main text-sm ">
                    {el?.product?.title}
                  </span>
                  <span className="text-sm">{el?.color}</span>
                  <span className="text-sm">
                    {`${el?.quantity} x ${formatMoney(el?.product?.price)}`}
                  </span>
                  <span className="text-sm">
                    {formatMoney(el?.product?.price * el?.quantity)}
                  </span>
                </div>
              </div>
              <span
                onClick={() => deleteCart(el?.product?._id, el?.color)}
                className="h-8 w-8  cursor-pointer  rounded-full hover:bg-red-500 hover:text-white "
              >
                <RiDeleteBin5Fill size={20} />
              </span>
            </div>
          ))}
      </section>
      <footer className="row-span-2  flex flex-col justify-between h-full">
        <div className="flex justify-between pt-4  border-t border-gray-300">
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
        <span className="text-center text-xs italic">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Buttons
          fw
          className="w-full py-3"
          handleOnclick={() => {
            props.dispatch(showCart({ isShowCart: false }));
            navigate(`/${path.MEMBER}/${path.DETAIL_CART}`);
          }}
        >
          Checkout
        </Buttons>
      </footer>
    </div>
  );
};

export default withBase(Cart);

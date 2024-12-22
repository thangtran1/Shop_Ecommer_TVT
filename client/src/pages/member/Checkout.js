import React, { useEffect, useState } from "react";
import img from "assets/payment-image.jpg";
import { useSelector, useDispatch } from "react-redux";
import { formatMoney } from "ultils/helper";
import { Paypal, PaymentSuccess } from "components";
import InputForm from "components/InputForm";
import { useForm } from "react-hook-form";
import { getCurrent } from "store/user.js/asyncAction";
import withBase from "hocs/withBase";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { currentCart, current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const address = watch("address");

  useEffect(() => {
    setValue("address", current?.address);
  }, [current?.address]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(getCurrent());
    }
  }, [isSuccess]);

  return (
    <div className="w-full p-8 grid h-full max-h-screen overflow-y-auto grid-cols-10 gap-6">
      {isSuccess && <PaymentSuccess />}
      <div className="w-full col-span-4 flex items-center ">
        <img src={img} alt="paymen-img" className="h-[70%]  object-contain" />
      </div>
      <div className="w-full  col-span-6 justify-center flex flex-col  gap-4">
        <h3 className="text-3xl mb-6 font-semibold uppercase">
          Checkout Your Cart
        </h3>
        <div className="flex w-full gap-6 justify-between ">
          <div className="flex-1">
            <table className="table-auto  flex-1">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-200 ">
                  <th className="text-left p-2">Product</th>
                  <th className="text-center p-2">Quantity</th>
                  <th className="text-right p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentCart?.map((item, index) => (
                  <tr
                    className="border-b border-gray-100 bg-gray-100 "
                    key={item._id}
                  >
                    <td className="text-left p-2">{item?.product?.title}</td>
                    <td className="text-center p-2">{item.quantity}</td>
                    <td className="text-right p-2">
                      {formatMoney(item.product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-medium text-sm">SubTotal: </span>
                <span className="font-medium ">
                  {formatMoney(
                    currentCart?.reduce(
                      (acc, el) => acc + el?.product?.price * el?.quantity,
                      0
                    )
                  )}
                </span>
              </div>
              <div>
                <InputForm
                  label="Your Address"
                  register={register}
                  errors={errors}
                  id="address"
                  validate={{ required: "Address is required" }}
                  placeholder="Please fill in your address"
                  type="text"
                  style="text-sm"
                />
              </div>
            </div>
            {address && address.length > 5 && (
              <div className="mt-auto w-full mx-auto">
                <Paypal
                  payload={{
                    address,
                    products: currentCart,
                    total:
                      Math.round(
                        +currentCart?.reduce(
                          (acc, item) =>
                            acc + item.product.price * item.quantity,
                          0
                        ) / 23500
                      ) * 1000,
                  }}
                  setIsSuccess={setIsSuccess}
                  amount={
                    Math.round(
                      +currentCart?.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                      ) / 23500
                    ) * 1000
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(Checkout);

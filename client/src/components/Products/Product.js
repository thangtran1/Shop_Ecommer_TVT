import React, { useState } from "react";
import { formatMoney } from "ultils/helper";
import label from "assets/label.webp";
// import label2 from "../assets/label2.png";
import { renderStarFromNumber } from "ultils/helper";
import { SelectOptions } from "..";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import withBase from "hocs/withBase";
import QuickView from "components/Products/QuickView";
import { showModal } from "store/app/appReducer";
import { apiUpdateCart } from "apis/user";
import { toast } from "react-toastify";
import { getCurrent } from "store/user.js/asyncAction";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "ultils/path";
import { createSearchParams } from "react-router-dom";
const { FaEye, IoMdMenu, IoMdHeart, BsCart4, FaCartArrowDown } = icons;
const Product = ({
  productData,
  isNew,
  normal,
  navigate,
  dispatch,
  location,
}) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const { current } = useSelector((state) => state.user);
  const handlerClickOption = async (e, type) => {
    e.stopPropagation();
    e.preventDefault();
    if (type === "HEART") {
    }
    if (type === "CART") {
      if (!current)
        return Swal.fire({
          title: "Please login to add to cart",
          icon: "warning",
          confirmButtonText: "Login",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonColor: "#3085d6",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: window.location.pathname,
              }).toString(),
            });
        });
      const response = await apiUpdateCart({
        pid: productData?._id || "",
        color: productData?.color || "",
        quantity: 1,
        price: productData?.price,
        thumbnail: productData?.thumb,
        title: productData?.title,
      });
      if (response.success) {
        toast.success(response.message || "Add to cart successfully");
        dispatch(getCurrent());
      } else {
        toast.error(response.message || "Add to cart failed");
      }
      console.log(response, "response111111");
    }
    if (type === "EYE") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: <QuickView productData={productData} />,
        })
      );
    }
  };
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
              <span
                title="Add to wishlist"
                onClick={(e) => handlerClickOption(e, "HEART")}
              >
                <SelectOptions icon={<IoMdHeart />} />
              </span>
              {current?.cart?.some(
                (el) => el.product === productData?._id.toString()
              ) ? (
                <span
                  title="Added to cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handlerClickOption(e, "CART");
                  }}
                >
                  <SelectOptions icon={<FaCartArrowDown color="yellow" />} />
                </span>
              ) : (
                <span
                  title="Add to cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handlerClickOption(e, "CART");
                  }}
                >
                  <SelectOptions icon={<BsCart4 color="red" />} />
                </span>
              )}

              <span
                title="Quick view"
                onClick={(e) => handlerClickOption(e, "EYE")}
              >
                <SelectOptions icon={<FaEye />} />
              </span>
            </div>
          )}
          <img
            onClick={(e) => e.stopPropagation()}
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

export default withBase(Product);

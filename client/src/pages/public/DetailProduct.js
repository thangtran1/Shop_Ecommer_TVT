import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, createSearchParams } from "react-router-dom";
import { apiGetProductDetail, apiGetProducts } from "apis/product";
import {
  Breadcrumb,
  Buttons,
  CustomSlider,
  ProductItem,
  DetailInformation,
  SelectQuantity,
} from "components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { formatPrice, renderStarFromNumber } from "ultils/helper";
import { productItemPerPage } from "ultils/constants";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiUpdateCart } from "apis/user";
import path from "ultils/path";
import { getCurrent } from "store/user.js/asyncAction";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const DetailProduct = ({ location, navigate, dispatch }) => {
  const { pid, title } = useParams();
  const { current } = useSelector((state) => state.user);
  const [currentImage, setCurrentImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [update, setUpdate] = useState(false);
  const titleRef = useRef(null);

  console.log("product", product);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProductDetail = useCallback(async () => {
    const response = await apiGetProductDetail(pid);
    if (response.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumb);
    }
  }, [pid]);
  const fetchRelatedProducts = useCallback(async () => {
    const response = await apiGetProducts({
      category: product?.category,
      // limit: 4,
    });
    if (response.success) {
      setRelatedProducts(response.products);
    }
  }, [product?.category]);
  useEffect(() => {
    if (pid) fetchProductDetail();
    if (product?.category) fetchRelatedProducts();
    if (titleRef?.current) {
      titleRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pid, fetchProductDetail, product?.category, fetchRelatedProducts]);

  const handleQuantity = useCallback((number) => {
    if (!Number(number) || Number(number) < 1) {
      return setQuantity(1);
    } else {
      setQuantity(Number(number));
    }
  }, []);

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "increase" && quantity < product?.quantity) {
        setQuantity(quantity + 1);
      } else if (flag === "decrease" && quantity > 1) {
        setQuantity(quantity - 1);
      }
    },
    [quantity, product?.quantity]
  );
  useEffect(() => {
    if (pid) fetchProductDetail();
  }, [update]);

  const reRender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const handleAddToCart = async () => {
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
      pid: product?._id || "",
      color: product?.color || "",
      quantity: quantity || 1,
      price: product?.price,
      thumbnail: product?.thumb,
      title: product?.title,
    });
    if (response.success) {
      toast.success(response.message || "Add to cart successfully");
      dispatch(getCurrent());
    } else {
      toast.error(response.message || "Add to cart failed");
    }
    console.log(response, "response111111");
  };
  return (
    product && (
      <div ref={titleRef} className="w-full  ">
        <div className="h-[81px] flex items-center justify-center bg-gray-100">
          <div className="w-main">
            <h3>{title}</h3>
            <Breadcrumb title={title} category={product?.category} />
          </div>
        </div>
        <div className="w-main mx-auto mt-4 flex">
          <div className=" flex flex-col gap-4 w-2/5">
            <div className="w-[458px] h-[458px] flex items-center  border overflow-hidden ">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: currentImage,
                  },
                  largeImage: {
                    src: currentImage,
                    width: 1800,
                    height: 1500,
                  },
                }}
              />
            </div>
            <div className="w-[458px]">
              <Slider
                className="image flex flex-2 justify-between -mx-2"
                {...settings}
              >
                {product?.images.map((el) => (
                  <div className="flex-1 p-1 " key={el}>
                    <img
                      src={el}
                      alt="img-detail"
                      className="h-[143px]  w-[143px] object-cover cursor-pointer hover:opacity-90 border-solid border border-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImage(el);
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="border-purple-950 border  w-2/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[30px] font-semibold">{`${formatPrice(
                product?.price
              )} VNĐ`}</h2>
              <span className="text-sm text-main">{`Kho: ${product?.quantity}`}</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
              <span className="text-sm text-main italic">{`Đã bán: (${product?.sold}) cái`}</span>
            </div>
            <ul className="list-square text-sm text-gray-500 leading-6 pl-4">
              {product?.description?.length > 1 &&
                product?.description?.map((el) => (
                  <li className="leading-6" key={el}>
                    {el}
                  </li>
                ))}
              {product?.description?.length === 1 && (
                <div
                  className="text-sm text-gray-500 line-clamp-[10] mb-8 justify-normal"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
              )}
            </ul>
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity</span>
                <SelectQuantity
                  quantity={quantity}
                  handleChangeQuantity={handleChangeQuantity}
                  handleQuantity={handleQuantity}
                />
              </div>
              <Buttons handleOnclick={handleAddToCart} fw>
                Thêm vào giỏ hàng
              </Buttons>
            </div>
          </div>
          <div className="w-1/5">
            {productItemPerPage.map((el) => (
              <ProductItem
                key={el.id}
                title={el.title}
                sub={el.sub}
                icon={el.icon}
              />
            ))}
          </div>
        </div>
        <div className="w-main mx-auto mt-8">
          <DetailInformation
            totalRatings={product?.totalRatings}
            nameProduct={product?.title}
            pid={product?._id}
            ratings={product?.ratings}
            reRender={reRender}
          />
        </div>
        <div className="w-main mx-auto mt-8">
          <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
            {`Other Customers also buy:`}
          </h3>
          <CustomSlider products={relatedProducts} normal={true} />
        </div>
      </div>
    )
  );
};

export default withBase(DetailProduct);

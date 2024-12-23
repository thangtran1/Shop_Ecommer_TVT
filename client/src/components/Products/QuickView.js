import React, { useState, memo } from "react";
import { formatPrice, renderStarFromNumber } from "ultils/helper";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import SelectQuantity from "components/DetailProduct/SelectQuantity";
import Buttons from "components/Buttons";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const QuickView = ({ productData }) => {
  const [currentImage, setCurrentImage] = useState(productData?.thumb);
  const [quantity, setQuantity] = useState(1);
  const handleChangeQuantity = (flag) => {
    if (flag === "increase" && quantity < productData?.quantity) {
      setQuantity(quantity + 1);
    } else if (flag === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto">
      <div className="flex  gap-4 w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="w-[300px] h-[300px] flex items-center border overflow-hidden">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Product Image",
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
              {productData?.images.map((el) => (
                <div className="flex-1 p-1" key={el}>
                  <img
                    src={el}
                    alt="img-detail"
                    className="h-[143px] w-[143px] object-cover cursor-pointer hover:opacity-90 border-solid border border-gray-200"
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
        <div className="border-purple-950 border w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-semibold">{`${formatPrice(
              productData?.price
            )} VNĐ`}</h2>
            <span className="text-sm text-main">{`Kho: ${productData?.quantity}`}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStarFromNumber(productData?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
            <span className="text-sm text-main italic">{`Đã bán: (${productData?.sold}) cái`}</span>
          </div>
          <ul className="list-square text-sm text-gray-500 leading-6 pl-4">
            {productData?.description?.map((el, index) => (
              <li className="leading-6" key={index}>
                {el}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Buttons fw>Thêm vào giỏ hàng</Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuickView);

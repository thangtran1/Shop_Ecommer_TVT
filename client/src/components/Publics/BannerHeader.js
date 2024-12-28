import React, { useRef } from "react";
import Slider from "react-slick";
import { SLIDER_ITEMS } from "ultils/constants";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Sử dụng biểu tượng mới
import withBase from "hocs/withBase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BannerHeader = () => {
  const slider = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="header-banner relative m-h-[30px] p-[2px] w-full bg-[#e9efff]">
      <div className="w-main m-auto flex flex-col justify-around pl-[80px]">
        <Slider ref={slider} {...settings}>
          {SLIDER_ITEMS.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-sm font-serif text-[#000093]"
            >
              <img
                src={item.image}
                alt={item.text}
                className="w-[300px] h-[30px]"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="absolute left-[100px] top-1/2 transform -translate-y-1/2">
        <FaChevronLeft
          size={26}
          color="yellow !important"
          className="cursor-pointer"
          onClick={() => slider.current.slickPrev()}
        />
      </div>
      <div className="absolute right-[100px] top-1/2 transform -translate-y-1/2">
        <FaChevronRight
          size={26}
          color="yellow !important"
          className="cursor-pointer"
          onClick={() => slider.current.slickNext()}
        />
      </div>
    </div>
  );
};
export default withBase(BannerHeader);

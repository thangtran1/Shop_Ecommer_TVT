import React, { useRef, useState, memo } from "react";
import Slider from "react-slick";
import { SLIDER_ITEMS_HOME } from "ultils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerRight1 from "assets/BannerHome/img-right-banner1.png";
import bannerRight2 from "assets/BannerHome/img-right-banner2.png";
import bannerRight3 from "assets/BannerHome/img-right-banner3.png";
const Banner = () => {
  const slider = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Tắt mặc định để tự tạo nút
    beforeChange: (current, next) => setActiveIndex(next),
  };

  const handleTextClick = (index) => {
    slider.current.slickGoTo(index);
  };

  return (
    <div className="flex gap-5 items-center justify-center ">
      <div className="banner-header flex-7 h-auto relative shadow-lg rounded-lg overflow-hidden group">
        <div className="relative">
          <Slider ref={slider} {...settings}>
            {SLIDER_ITEMS_HOME.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </Slider>
          {/* Nút Prev */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => slider.current.slickPrev()}
              className="bg-transparent border-none cursor-pointer"
            >
              <span className="text-2xl">❮</span>
            </button>
          </div>
          {/* Nút Next */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => slider.current.slickNext()}
              className="bg-transparent border-none cursor-pointer"
            >
              <span className="text-2xl">❯</span>
            </button>
          </div>
        </div>
        <div className="text-center cursor-pointer flex items-center justify-center">
          {SLIDER_ITEMS_HOME.map((item, index) => (
            <div
              onClick={() => handleTextClick(index)}
              key={index}
              className={`p-3 hover:bg-gray-100 h-[80px] flex items-center justify-center transition duration-300 ${
                activeIndex === index
                  ? "font-[700] text-[#343a40] border-b-[3px] border-red-500 text-[12px] line-height-20"
                  : "text-[#343a40] text-[12px] line-height-20 hover:border-b-2 hover:border-gray-300"
              }`}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-3 justify-between h-[100%] rounded-lg flex flex-col gap-[5px]">
        <img
          src={bannerRight1}
          alt="bannerRight1"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <img
          src={bannerRight2}
          alt="bannerRight2"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <img
          src={bannerRight3}
          alt="bannerRight3"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default memo(Banner);

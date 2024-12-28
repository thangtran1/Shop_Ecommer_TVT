import React from "react";
import { Outlet } from "react-router-dom";
import {
  Header,
  Navigation,
  TopHeader,
  Footer,
  BannerHeader,
  FooterEnd,
} from "components";
import { Link } from "react-router-dom";
import { GoChevronUp } from "react-icons/go";
import iconZalo from "assets/icon-zalo.png";
import { useState, useEffect } from "react";
const Public = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full  overflow-y-auto flex flex-col items-center  justify-center">
      <BannerHeader />
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex flex-col items-center">
        <Outlet />
      </div>
      {isVisible && (
        <div
          className="flex flex-col bottom-[90px] w-[45px] h-[45px] bg-main rounded-md justify-center items-center text-center fixed  right-[86px] cursor-pointer"
          onClick={scrollToTop}
        >
          <GoChevronUp className="text-white" size={20} />
          <small className="text-white text-[10px] font-bold">Lên đầu</small>
        </div>
      )}
      <Link to="https://zalo.me/0389215396" target="_blank">
        <div className="fixed bottom-[1rem] right-20 flex flex-col items-center ">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[75px] h-[75px] bg-blue-400 rounded-full animate-heart-light"></div>
            <div className="w-[60px] h-[60px] bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-heart">
              <img src={iconZalo} alt="logo" className="w-[45px] h-[45px]" />
            </div>
          </div>
        </div>
      </Link>
      <Footer />
      <FooterEnd />
    </div>
  );
};

export default Public;

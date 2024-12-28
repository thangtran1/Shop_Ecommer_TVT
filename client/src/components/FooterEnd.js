import React from "react";
import logo1 from "assets/IconFooter/logo1.png";
import logo from "assets/IconFooter/logo.png";
const FooterEnd = () => {
  return (
    <div className="w-main">
      <div className="w-full flex p-5 gap-4 text-center text-[inherit]">
        <div className="flex-1 flex flex-col gap-2 text-[10px] font-[400]">
          <span className="hover:text-main cursor-pointer">
            Điện thoại iPhone 16 Pro – Điện thoại iPhone 16 Pro Max
          </span>
          <span className="hover:text-main cursor-pointer">
            Điện thoại iPhone 15 – Điện thoại iPhone 15 Pro Max
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2 text-[10px] font-[400]">
          <span className="hover:text-main cursor-pointer">
            Điện thoại – Điện thoại iPhone – Điện thoại Xiaomi
          </span>
          <span className="hover:text-main cursor-pointer">
            Điện thoại Samsung Galaxy – Điện thoại OPPO
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2 text-[10px] font-[400] ">
          <span className="hover:text-main cursor-pointer">
            Laptop – Laptop Acer – Laptop Dell – Laptop HP
          </span>
          <span className="hover:text-main cursor-pointer">
            Tivi – Tivi Samsung – Tivi Sony – Tivi LG
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2 text-[10px] font-[400] ">
          <span className="hover:text-main cursor-pointer">
            Đồ gia dụng – Máy hút bụi gia đình
          </span>
          <span className="hover:text-main cursor-pointer   ">
            Laptop AI – Black Friday là ngày gì
          </span>
        </div>
      </div>
      <div className="text-center text-[#4a4a4a] font-[400] text-[12px]">
        <span>© 2024 Tất cả các quyền được bảo lưu</span>
      </div>
      <div className="flex justify-center items-center my-3 gap-2">
        <img src={logo1} alt="logo1" />
        <img
          src={logo}
          alt="logo"
          className="w-[100px] h-[38px] object-contain"
        />
      </div>
    </div>
  );
};

export default FooterEnd;

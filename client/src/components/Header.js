import React from "react";
import logo from "../assets/logo_digital.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
const Header = () => {
  const { MdLocalPhone, MdOutlineMail, IoBagHandleOutline, FaUser } = icons;
  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className=" flex flex-col px-6 border-r items-center">
          <span className="flex  gap-4 items-center">
            <MdLocalPhone color="red" />
            <span className="font-semibold"> (+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className=" flex flex-col px-6 border-r items-center">
          <span className="flex  gap-4 items-center">
            <MdOutlineMail color="red" />
            <span className="font-semibold"> support@tadathemes.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className=" cursor-pointer flex items-center px-6 border-r justify-center gap-2">
          <IoBagHandleOutline color="red" />
          <span>9 item(s)</span>
        </div>
        <div className=" cursor-pointer flex  px-6  items-center gap-2">
          <FaUser color="red" />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
